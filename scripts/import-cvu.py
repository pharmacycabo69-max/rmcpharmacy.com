"""Imports the cvupharmacy catalog into the shop.

Usage: python3 scripts/import-cvu.py <path-to-cvupharmacy-repo>
Writes lib/cvuProducts.ts (id, name, category, price in cents) and public/products/cvu/<id>.jpg (480x360).
Only products with stock, a price and a photo are written; the rest stay out of the shop.
"""
import io, json, os, re, sys
from html import unescape
from PIL import Image, ImageOps

# Medicines stay out of the shop (house rule, and Google Ads suspended the account over the pharmacy policy).
MEDICINE_CATEGORIES = {"pain-relief", "digestive", "cold-flu", "diabetic-care", "diabetic", "health-pharmacy", "womens-health"}
MEDICINE_WORDS = re.compile(
    r"\b(caps|tabs?|drops|tablet|tablets|tableta|tabletas|capsule|capsules|capsula|capsulas|syrup|jarabe|solution|solucion|solución|suspension|suspensión|injection|inyectable|ointment|pomada|eye drops|gotas|oral|nasal|spray nasal|pearls|pearl|sachets? \d+ ?mg|\d+ ?mg|\d+ ?mcg|\d+/\d+ ?mg)\b|"
    r"paracetamol|acetaminophen|ibuprofen|ibuprofeno|naproxen|naproxeno|diclofenac|aspirin|aspirina|loratadine|loratadina|cetirizine|cetirizina|diphenhydramine|difenhidramina|dimenhydrinate|dimenhidrinato|"
    r"guaifenesin|chlorphenamine|clorfenamina|phenylephrine|fenilefrina|pseudoephedrine|benzocaine|benzocaina|senosides|sennosides|omeprazole|omeprazol|ranitidine|metformin|metformina|insulin|insulina|"
    r"amoxicillin|amoxicilina|azithromycin|azitromicina|ciprofloxacin|ciprofloxacino|sildenafil|tadalafil|tramadol|ketorolac|ketorolaco|dexamethasone|dexametasona|prednisone|prednisona|"
    r"loperamide|loperamida|bismuth|bismuto|simethicone|simeticona|ambroxol|bromhexine|bromhexina|dextromethorphan|dextrometorfano|oxolamine|salbutamol|clotrimazole|clotrimazol|miconazole|miconazol|hydrocortisone|hidrocortisona|"
    r"minoxidil|finasteride|finasterida|tretinoin|tretinoína|retinol a|antibiotic|antibiótico|antihistamin|antiinflamatorio|analgesic|analgésico|antiacid|antiácido|antipyretic|antifebril|laxative|laxante|probiotic drops",
    re.I,
)

src = sys.argv[1]
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out_img = os.path.join(root, "public/products/cvu")
os.makedirs(out_img, exist_ok=True)
for old in os.listdir(out_img):
    os.remove(os.path.join(out_img, old))
data = json.load(open(os.path.join(src, "data/products.json")))

rows, cats = [], {}
removed = 0
for p in data:
    cents = int((p.get("prices") or {}).get("price") or 0)
    if not p.get("is_in_stock") or cents <= 0 or not p.get("images"):
        continue
    m = re.search(r"uploads/(.+)$", p["images"][0].get("src", ""))
    path = os.path.join(src, "public/images", m.group(1)) if m else ""
    if not os.path.exists(path):
        continue
    links = [c["link"] for c in (p.get("categories") or [])]
    seg = re.search(r"product-category/([^/]+)/", links[0]) if links else None
    top = seg.group(1) if seg else "other"
    if top in MEDICINE_CATEGORIES or MEDICINE_WORDS.search(unescape(p["name"])):
        removed += 1
        continue
    label = unescape(next((c["name"] for c in p["categories"] if c["link"] == links[0]), top))
    if top not in cats:
        cats[top] = None
    name = unescape(re.sub(r"\s+", " ", p["name"])).strip()
    try:
        im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    except Exception:
        continue
    bg = im.getpixel((2, 2))
    if sum(bg) < 600:
        bg = (255, 255, 255)
    sc = min(440 / im.width, 330 / im.height)
    t = im.resize((max(1, int(im.width * sc)), max(1, int(im.height * sc))), Image.LANCZOS)
    canvas = Image.new("RGB", (480, 360), bg)
    canvas.paste(t, ((480 - t.width) // 2, (360 - t.height) // 2))
    canvas.save(os.path.join(out_img, f"{p['id']}.jpg"), quality=62, optimize=True, progressive=True)
    rows.append((p["id"], name, top, cents))

LABELS = {
    "vitamins-supplements": ["Vitamins & Supplements", "Vitaminas y suplementos"], "medical-equipment": ["Medical equipment", "Equipo médico"],
    "baby-kids": ["Baby & kids", "Bebé y niños"], "personal-care": ["Personal care", "Cuidado personal"], "home-living": ["Home & living", "Hogar"],
    "skin-care": ["Skin care", "Cuidado de la piel"], "pet-supplies": ["Pet supplies", "Mascotas"], "orthopedic-support": ["Orthopedic support", "Soporte ortopédico"],
    "hair-care": ["Hair care", "Cuidado del cabello"], "makeup": ["Makeup", "Maquillaje"], "beauty-tools-appliances": ["Beauty tools", "Herramientas de belleza"],
    "fragrances": ["Fragrances", "Fragancias"], "oral-care": ["Oral care", "Higiene bucal"], "home-kitchen": ["Kitchen", "Cocina"], "vision-care": ["Vision care", "Cuidado visual"],
    "food-beverages": ["Food & beverages", "Alimentos y bebidas"], "fashion-accessories": ["Accessories", "Accesorios"], "wellness-recovery": ["Wellness & recovery", "Bienestar y recuperación"],
    "sun-care": ["Sun care", "Protección solar"], "electronics": ["Electronics", "Electrónica"], "pain-relief": ["Pain relief", "Alivio del dolor"], "digestive": ["Digestive", "Digestivo"],
    "first-aid": ["First aid", "Primeros auxilios"], "fitness": ["Fitness", "Fitness"], "sports-fitness": ["Sports", "Deportes"], "toys-games": ["Toys & games", "Juguetes"],
    "beauty-personal-care": ["Beauty", "Belleza"], "cold-flu": ["Cold & flu", "Gripa"], "dental-care": ["Dental care", "Cuidado dental"], "diabetic-care": ["Diabetic care", "Cuidado diabético"],
    "health-pharmacy": ["Health & pharmacy", "Salud y farmacia"], "travel-essentials": ["Travel essentials", "Esenciales de viaje"], "womens-health": ["Women's health", "Salud de la mujer"],
    "brands": ["Brands", "Marcas"], "other": ["Other", "Otros"],
}
used = sorted({r[2] for r in rows}, key=lambda c: -sum(1 for r in rows if r[2] == c))
ts = ["// Generated by scripts/import-cvu.py from the cvupharmacy catalog. Do not edit by hand.",
      "// Row: [id, name, category, price in USD cents]. The photo is /products/cvu/<id>.jpg.", "",
      "export const CVU_CATEGORIES: Record<string, [string, string]> = " + json.dumps({c: LABELS.get(c, [c.replace('-', ' ').title()] * 2) for c in used}, ensure_ascii=False) + ";", "",
      "export const CVU_ROWS: [number, string, string, number][] = ["]
for r in rows:
    ts.append("  " + json.dumps(list(r), ensure_ascii=False) + ",")
ts.append("];")
open(os.path.join(root, "lib/cvuProducts.ts"), "w").write("\n".join(ts) + "\n")
print(len(rows), "products;", len(used), "categories;", removed, "medicine products left out")
