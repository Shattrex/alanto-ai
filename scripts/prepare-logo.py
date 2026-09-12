"""Prepares the Alanto AI logo for the cream site background.

Knocks out the near-white background from the supplied logo, trims the
transparent border, and writes the full lockup plus a mark-only favicon.
"""

from PIL import Image

SRC = (
    "/Users/shattrex.media/.cursor/projects/"
    "Users-shattrex-media-Desktop-AlterEgo-part2/assets/"
    "alanto-logo-a9800ca7-da68-44d1-b11f-2661ee807171.png"
)
OUT_DIR = "/Users/shattrex.media/Desktop/AlterEgo_part2/public"

img = Image.open(SRC).convert("RGBA")
width, height = img.size
pixels = img.load()

for y in range(height):
    for x in range(width):
        r, g, b, _ = pixels[x, y]
        if r > 242 and g > 242 and b > 242:
            pixels[x, y] = (r, g, b, 0)

trimmed = img.crop(img.getbbox())
trimmed.save(f"{OUT_DIR}/alanto-logo.png")
print("full lockup", trimmed.size)

mark_width = int(trimmed.size[0] * 0.45)
mark = trimmed.crop((0, 0, mark_width, trimmed.size[1]))
mark = mark.crop(mark.getbbox())
mark.save(f"{OUT_DIR}/alanto-mark.png")
print("mark", mark.size)
