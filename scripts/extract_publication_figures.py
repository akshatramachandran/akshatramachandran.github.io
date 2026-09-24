"""Build publication-card images from figures in the original papers.

PDFs are temporary source material and are intentionally not committed. The crop
coordinates below select published figures; this script does not draw or invent
technical content.
"""

from pathlib import Path
from PIL import Image
import pypdfium2 as pdfium


ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "tmp" / "pdfs" / "papers"
OUTPUT = ROOT / "images" / "publications"
SIZE = (1200, 720)


def fit_canvas(image: Image.Image, output: Path) -> None:
    image = image.convert("RGB")
    scale = min((SIZE[0] - 56) / image.width, (SIZE[1] - 56) / image.height)
    image = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", SIZE, "white")
    canvas.paste(image, ((SIZE[0] - image.width) // 2, (SIZE[1] - image.height) // 2))
    canvas.save(output, "PNG", optimize=True)


def crop_pdf(name: str, page_index: int, box: tuple[float, float, float, float], output: str) -> None:
    pdf = pdfium.PdfDocument(SOURCES / name)
    page = pdf[page_index]
    image = page.render(scale=3.2).to_pil().convert("RGB")
    left, top, right, bottom = box
    crop = image.crop((
        round(left * image.width),
        round(top * image.height),
        round(right * image.width),
        round(bottom * image.height),
    ))
    fit_canvas(crop, OUTPUT / output)


def copy_figure(source: Path, output: str) -> None:
    fit_canvas(Image.open(source), OUTPUT / output)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)

    # Figures cropped from the authors' publication PDFs.
    crop_pdf("thinkkv.pdf", 0, (0.22, 0.54, 0.79, 0.83), "thinkkv.png")
    crop_pdf("ouromamba.pdf", 0, (0.10, 0.27, 0.64, 0.43), "ouromamba.png")
    crop_pdf("flexcim.pdf", 3, (0.06, 0.06, 0.51, 0.29), "flexcim.png")
    crop_pdf("onedse.pdf", 1, (0.04, 0.03, 0.97, 0.37), "onedse.png")
    crop_pdf("polestar-cache.pdf", 1, (0.14, 0.07, 0.86, 0.29), "polestar-cache.png")
    crop_pdf("recap-slides.pdf", 4, (0.02, 0.08, 0.98, 0.94), "recap.png")

    # High-resolution figures that already shipped with the original portfolio.
    copy_figure(ROOT / "images" / "airchitect.png", "airchitect-v2.png")
    copy_figure(ROOT / "images" / "clamp_vit.png", "clamp-vit.png")
    copy_figure(ROOT / "images" / "microscopiq.png", "microscopiq.png")
    copy_figure(ROOT / "images" / "DAC24.png", "logarithmic-posits.png")

    # Original publisher/author-hosted paper figures acquired for this rebuild.
    copy_figure(SOURCES / "building-footprints-source.jpg", "building-footprints.png")
    copy_figure(SOURCES / "positiv-source.jpg", "positiv.png")

    print(f"Extracted 12 original publication figures into {OUTPUT}")


if __name__ == "__main__":
    main()
