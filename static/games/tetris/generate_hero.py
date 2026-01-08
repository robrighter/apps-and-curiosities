#!/usr/bin/env python3
"""
Generate a vintage-style hero image for Tetris article
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create image with vintage cream background
width, height = 1200, 630
bg_color = (245, 241, 227)  # Vintage cream #F5F1E3
fg_color = (44, 36, 22)     # Dark brown #2C2416
grid_color = (139, 134, 119)  # Lighter brown for grid

img = Image.new('RGB', (width, height), bg_color)
draw = ImageDraw.Draw(img)

# Try to use a nice font, fall back to default if not available
try:
    title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 36)
    subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 20)
    header_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", 18)
    body_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 14)
    small_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 13)
    caption_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf", 16)
except:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    header_font = ImageFont.load_default()
    body_font = ImageFont.load_default()
    small_font = ImageFont.load_default()
    caption_font = ImageFont.load_default()

# Title
title_text = "TETRIS: THE FALLING BLOCKS PUZZLE"
title_bbox = draw.textbbox((0, 0), title_text, font=title_font)
title_width = title_bbox[2] - title_bbox[0]
draw.text((width // 2 - title_width // 2, 40), title_text, fill=fg_color, font=title_font)

subtitle_text = "A Study in Spatial Reasoning and Real-Time Strategy"
subtitle_bbox = draw.textbbox((0, 0), subtitle_text, font=subtitle_font)
subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
draw.text((width // 2 - subtitle_width // 2, 85), subtitle_text, fill=fg_color, font=subtitle_font)

# Draw main game grid
grid_x, grid_y = 150, 140
cell_size = 25
grid_width, grid_height = 10, 16

# Grid border
draw.rectangle([grid_x, grid_y, grid_x + grid_width * cell_size, grid_y + grid_height * cell_size],
               outline=fg_color, width=3)

# Grid lines
for i in range(1, grid_width):
    x = grid_x + i * cell_size
    draw.line([(x, grid_y), (x, grid_y + grid_height * cell_size)], fill=grid_color, width=1)
for i in range(1, grid_height):
    y = grid_y + i * cell_size
    draw.line([(grid_x, y), (grid_x + grid_width * cell_size, y)], fill=grid_color, width=1)

# Draw filled blocks (creating a partial tetris pattern)
blocks = [
    # Bottom rows
    (0, 15), (1, 15), (2, 15), (4, 15), (5, 15), (6, 15), (7, 15), (8, 15), (9, 15),
    (0, 14), (1, 14), (2, 14), (3, 14), (4, 14), (6, 14), (7, 14), (8, 14), (9, 14),
    (1, 13), (2, 13), (3, 13), (4, 13), (5, 13), (6, 13), (8, 13), (9, 13),
    # Middle scattered blocks
    (0, 12), (8, 12), (9, 12),
    (0, 11), (1, 11), (8, 11), (9, 11),
    (5, 10), (6, 10), (7, 10),
    (5, 9),
]

for x, y in blocks:
    draw.rectangle([grid_x + x * cell_size + 2, grid_y + y * cell_size + 2,
                   grid_x + (x + 1) * cell_size - 2, grid_y + (y + 1) * cell_size - 2],
                  fill=fg_color)

# Draw falling T-piece (outlined with hatching)
falling_piece = [(3, 3), (4, 3), (5, 3), (4, 4)]

for x, y in falling_piece:
    # Draw outline
    draw.rectangle([grid_x + x * cell_size + 2, grid_y + y * cell_size + 2,
                   grid_x + (x + 1) * cell_size - 2, grid_y + (y + 1) * cell_size - 2],
                  outline=fg_color, width=2)
    # Draw diagonal lines to show it's falling
    draw.line([(grid_x + x * cell_size + 4, grid_y + y * cell_size + 4),
               (grid_x + (x + 1) * cell_size - 2, grid_y + (y + 1) * cell_size - 2)],
              fill=fg_color, width=1)
    draw.line([(grid_x + (x + 1) * cell_size - 2, grid_y + y * cell_size + 4),
               (grid_x + x * cell_size + 4, grid_y + (y + 1) * cell_size - 2)],
              fill=fg_color, width=1)

# Draw the 7 tetromino shapes on the right
tetromino_x, tetromino_y = 500, 140
piece_size = 18

draw.text((tetromino_x, tetromino_y), "THE SEVEN TETROMINOES:", fill=fg_color, font=header_font)

# I-piece
draw.text((tetromino_x + 100, tetromino_y + 35), "I-PIECE (Line)", fill=fg_color, font=body_font)
for i in range(4):
    draw.rectangle([tetromino_x + i * piece_size, tetromino_y + 20,
                   tetromino_x + (i + 1) * piece_size - 2, tetromino_y + 20 + piece_size - 2],
                  fill=fg_color)

# O-piece
draw.text((tetromino_x + 100, tetromino_y + 85), "O-PIECE (Square)", fill=fg_color, font=body_font)
for x, y in [(0, 0), (1, 0), (0, 1), (1, 1)]:
    draw.rectangle([tetromino_x + x * piece_size, tetromino_y + 70 + y * piece_size,
                   tetromino_x + (x + 1) * piece_size - 2, tetromino_y + 70 + (y + 1) * piece_size - 2],
                  fill=fg_color)

# T-piece
draw.text((tetromino_x + 100, tetromino_y + 135), "T-PIECE", fill=fg_color, font=body_font)
for x, y in [(0, 0), (1, 0), (2, 0), (1, 1)]:
    draw.rectangle([tetromino_x + x * piece_size, tetromino_y + 120 + y * piece_size,
                   tetromino_x + (x + 1) * piece_size - 2, tetromino_y + 120 + (y + 1) * piece_size - 2],
                  fill=fg_color)

# S-piece
draw.text((tetromino_x + 100, tetromino_y + 185), "S-PIECE (Zigzag)", fill=fg_color, font=body_font)
for x, y in [(1, 0), (2, 0), (0, 1), (1, 1)]:
    draw.rectangle([tetromino_x + x * piece_size, tetromino_y + 170 + y * piece_size,
                   tetromino_x + (x + 1) * piece_size - 2, tetromino_y + 170 + (y + 1) * piece_size - 2],
                  fill=fg_color)

# Z-piece
draw.text((tetromino_x + 100, tetromino_y + 235), "Z-PIECE (Zigzag)", fill=fg_color, font=body_font)
for x, y in [(0, 0), (1, 0), (1, 1), (2, 1)]:
    draw.rectangle([tetromino_x + x * piece_size, tetromino_y + 220 + y * piece_size,
                   tetromino_x + (x + 1) * piece_size - 2, tetromino_y + 220 + (y + 1) * piece_size - 2],
                  fill=fg_color)

# J-piece
draw.text((tetromino_x + 100, tetromino_y + 285), "J-PIECE", fill=fg_color, font=body_font)
for x, y in [(0, 0), (0, 1), (1, 1), (2, 1)]:
    draw.rectangle([tetromino_x + x * piece_size, tetromino_y + 270 + y * piece_size,
                   tetromino_x + (x + 1) * piece_size - 2, tetromino_y + 270 + (y + 1) * piece_size - 2],
                  fill=fg_color)

# L-piece
draw.text((tetromino_x + 100, tetromino_y + 335), "L-PIECE", fill=fg_color, font=body_font)
for x, y in [(2, 0), (0, 1), (1, 1), (2, 1)]:
    draw.rectangle([tetromino_x + x * piece_size, tetromino_y + 320 + y * piece_size,
                   tetromino_x + (x + 1) * piece_size - 2, tetromino_y + 320 + (y + 1) * piece_size - 2],
                  fill=fg_color)

# Game info panel
info_x, info_y = 850, 140
draw.rectangle([info_x, info_y, info_x + 280, info_y + 400], outline=fg_color, width=2)

draw.text((info_x + 10, info_y + 20), "GAME MECHANICS:", fill=fg_color, font=header_font)

mechanics = [
    "",
    "• Blocks fall from top",
    "• Rotate pieces 90°",
    "• Move left/right",
    "• Complete rows vanish",
    "• Score increases",
    "• Speed accelerates",
    "",
    "SCORING SYSTEM:",
    "",
    "1 Line:  100 pts",
    "2 Lines: 300 pts",
    "3 Lines: 500 pts",
    "4 Lines: 800 pts",
    "  (TETRIS!)",
    "",
    "STRATEGY:",
    "",
    "• Plan ahead",
    "• Leave gaps for",
    "  I-pieces",
    "• Build flat",
    "• Avoid stacking",
    "  too high"
]

y_offset = info_y + 50
for line in mechanics:
    draw.text((info_x + 15, y_offset), line, fill=fg_color, font=small_font)
    y_offset += 16

# Bottom caption
caption_text = "From Soviet Computing to Global Phenomenon"
caption_bbox = draw.textbbox((0, 0), caption_text, font=caption_font)
caption_width = caption_bbox[2] - caption_bbox[0]
draw.text((width // 2 - caption_width // 2, height - 50), caption_text, fill=fg_color, font=caption_font)

# Decorative border
draw.rectangle([10, 10, width - 10, height - 10], outline=fg_color, width=4)
draw.rectangle([15, 15, width - 15, height - 15], outline=fg_color, width=1)

# Save the image
output_path = os.path.join(os.path.dirname(__file__), 'hero.png')
img.save(output_path, 'PNG')
print(f"Hero image saved to: {output_path}")
