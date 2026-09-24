#!/usr/bin/env python3
"""Editable PowerPoint for the Action Pro × Leafy Brew partnership proposal."""

import os

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Emu, Inches, Pt
from lxml import etree

W, H = 13.333, 7.5

ESPRESSO = RGBColor(0x14, 0x11, 0x0E)
COFFEE = RGBColor(0x3C, 0x2A, 0x21)
LEAF = RGBColor(0x1E, 0x3A, 0x30)
LEAF_MID = RGBColor(0x2C, 0x4F, 0x42)
CREAM = RGBColor(0xF6, 0xF1, 0xE8)
IVORY = RGBColor(0xFB, 0xF8, 0xF3)
BEIGE = RGBColor(0xE7, 0xDC, 0xCB)
GOLD = RGBColor(0xC6, 0xA1, 0x5B)
GOLD_SOFT = RGBColor(0xE4, 0xD2, 0xAE)
INK = RGBColor(0x1C, 0x19, 0x17)
MUTED = RGBColor(0x5C, 0x55, 0x4E)
WHITE = RGBColor(0xFF, 0xFC, 0xF7)
ROAST = RGBColor(0x6B, 0x4A, 0x32)

SERIF = "Georgia"
SANS = "Arial"

NOTES = [
    "Thank you for sitting down with us. Action Pro would like to propose a working partnership with Leafy Brew Coffee & Cafe. A customer who shops with either of us can use that day’s invoice at the other business and receive a discount we agree in advance. I’ll show how the offer works, how we present it in the mall and online, and how a short MOU can hold it in place.",
    "This conversation is about a collaboration that helps both sides. We want more engaged customers, more people walking between the café and the store, and clearer visibility for both names. The customer should feel that visiting one of us makes a visit to the other more rewarding.",
    "Before the mechanics, it helps to be clear about Action Pro. Our vision is to promote Pakistani products, create employment here, support local economic growth, and offer quality at prices customers can accept. We want to grow with the businesses beside us. Leafy Brew is the kind of partner that vision is written for.",
    "The fit is straightforward. Both of us serve people who care about how they spend a day in the mall. A shopper is often a coffee guest, and a coffee guest is often a shopper. We already share a setting. This collaboration gives that audience a reason to cross from one door to the other, and it places both names where they can be seen together.",
    "The model is the same in both directions. A customer buys from Action Pro, brings the same-day invoice to Leafy Brew, and receives the agreed café discount. A customer buys from Leafy Brew, brings the same-day invoice to Action Pro, and receives the agreed store discount. Staff check the date and apply the rate printed on the stands. The percentage is a decision we should make together.",
    "The offer has to be visible at the moment of purchase. We suggest a table stand at Leafy Brew, a counter sign at Action Pro, and a small We Collaborate display in both places. The line can be this direct: shop at Action Pro today and enjoy X percent off at Leafy Brew. And the reverse for our counter. It should be readable from where a guest is already standing or seated.",
    "There is a further use, and it strengthens Leafy Brew’s events. When the café hosts or facilitates a gathering, organisers can tell attendees that Action Pro is part of the value of the day. Guests can receive a discount across clothing, makeup, tumblers, crockery, slippers, hair accessories, wallets, and purses. The event feels more complete, and the café has something extra to offer the organiser.",
    "For Leafy Brew, the gains are concrete. More footfall from people already in the mall. A reason to choose this café today. Signage that carries your name toward retail traffic. A visit that feels more generous. A brand image built on collaboration. A stronger conversation with event organisers. Social posts that introduce you to our audience. And referrals that arrive in a customer’s hand, as a receipt.",
    "Action Pro gains the mirror of that. More visits. Walk-ins who already have a reason to browse. An association with a lifestyle café. A warmer local impression. Awareness among guests who came for coffee. A loyalty idea that is simple to explain. And public proof, on your channels and ours, that the partnership is active.",
    "We should launch this as a shared story. A joint announcement, a launch post both of us can publish, and stories that show how to claim the offer: shop, keep the slip, show it today. The standees should match that line, so the mall and the feed say the same thing. After launch, short reminders keep the offer alive.",
    "The terms can stay short. We agree the percentage. The discount follows a same-day invoice. We both promote the partnership in-store and online. Event guests can be included. An MOU records responsibilities and how long the collaboration runs. We review it on a date we choose. The open decisions today are the rate, the duration, and the launch.",
    "We would like to build this with you. Together, Action Pro and Leafy Brew can offer customers more, be seen more often, and support each other’s growth with something guests will actually use. The next step is a working one: agree the percentage, sign a short MOU, and launch the stands with the first post. We look forward to partnering with Leafy Brew Coffee & Cafe.",
]


def rgb(shape, color):
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


def box(slide, x, y, w, h, color, roundness=None):
    kind = MSO_SHAPE.ROUNDED_RECTANGLE if roundness is not None else MSO_SHAPE.RECTANGLE
    shape = slide.shapes.add_shape(kind, Inches(x), Inches(y), Inches(w), Inches(h))
    rgb(shape, color)
    if roundness is not None:
        try:
            shape.adjustments[0] = roundness
        except Exception:
            pass
    return shape


def shadow(shape, alpha="14000"):
    ns = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
    sp_pr = shape._element.spPr
    effect = etree.SubElement(sp_pr, f"{ns}effectLst")
    outer = etree.SubElement(effect, f"{ns}outerShdw")
    outer.set("blurRad", "360000")
    outer.set("dist", "70000")
    outer.set("dir", "2700000")
    outer.set("algn", "tl")
    outer.set("rotWithShape", "0")
    color = etree.SubElement(outer, f"{ns}srgbClr")
    color.set("val", "1A1410")
    alpha_el = etree.SubElement(color, f"{ns}alpha")
    alpha_el.set("val", alpha)


def text(slide, x, y, w, h, content, font=SANS, size=16, color=INK, bold=False, italic=False,
         align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, spacing=None):
    shape = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = shape.text_frame
    tf.word_wrap = True
    tf.auto_size = None
    tf.anchor = anchor
    tf.margin_left = Emu(0)
    tf.margin_right = Emu(0)
    tf.margin_top = Emu(0)
    tf.margin_bottom = Emu(0)
    lines = content if isinstance(content, list) else [content]
    for i, line in enumerate(lines):
        if isinstance(line, str):
            spec = {"text": line}
        else:
            spec = line
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = spec.get("align", align)
        p.space_before = Pt(spec.get("before", 0))
        p.space_after = Pt(spec.get("after", 0))
        if "leading" in spec:
            p.line_spacing = spec["leading"]
        run = p.add_run()
        run.text = spec["text"]
        run.font.name = spec.get("font", font)
        run.font.size = Pt(spec.get("size", size))
        run.font.bold = spec.get("bold", bold)
        run.font.italic = spec.get("italic", italic)
        run.font.color.rgb = spec.get("color", color)
        track = spec.get("spacing", spacing)
        if track:
            run._r.get_or_add_rPr().set("spc", str(int(track * 100)))
    return shape


def bg(slide, color):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def footer(slide, num, dark=False):
    tone = RGBColor(0xD9, 0xD0, 0xC4) if dark else MUTED
    box(slide, 0.62, 6.98, 12.1, 0.012, GOLD)
    text(slide, 0.62, 7.08, 8.4, 0.28, "ACTION PRO   ×   LEAFY BREW COFFEE & CAFE",
         size=10, color=tone, spacing=1.4)
    text(slide, 9.4, 7.08, 3.3, 0.28, f"{num:02d}   /   12",
         size=10, color=tone, align=PP_ALIGN.RIGHT, spacing=1.4)


def kicker(slide, label, dark=False):
    tone = GOLD_SOFT if dark else ROAST
    box(slide, 0.62, 0.46, 0.38, 0.015, GOLD)
    text(slide, 1.12, 0.36, 8, 0.32, label.upper(), size=12, color=tone, spacing=2.4)


def note(slide, index):
    slide.notes_slide.notes_text_frame.text = NOTES[index]


def new(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def slide_cover(prs):
    s = new(prs)
    bg(s, ESPRESSO)
    text(s, 0.7, 1.45, 7.4, 0.34,
         [{"text": "ACTION PRO", "color": CREAM, "spacing": 1.6},
          {"text": "    ×    ", "font": SERIF, "color": GOLD, "size": 16},
          {"text": "LEAFY BREW COFFEE & CAFE", "color": CREAM, "spacing": 1.6}],
         size=13)
    text(s, 0.68, 1.95, 7.5, 3.1, [
        {"text": "Partnership", "font": SERIF, "size": 54, "color": CREAM, "after": 0},
        {"text": "Collaboration", "font": SERIF, "size": 54, "color": CREAM, "before": 0},
        {"text": "Proposal", "font": SERIF, "size": 54, "color": GOLD_SOFT, "italic": True},
    ])
    text(s, 0.72, 5.05, 6.7, 1.05,
         "A same-day discount alliance between a lifestyle retailer and a café — built so both businesses grow from the customers they already share.",
         size=18, color=RGBColor(0xE7, 0xDD, 0xD2))
    text(s, 0.72, 6.35, 7, 0.3, "PAKISTAN      ·      MALL PARTNERSHIP      ·      MUTUAL GROWTH",
         size=12, color=GOLD_SOFT, spacing=1.5)

    panel = box(s, 8.45, 0.72, 4.25, 6.05, CREAM, 0.08)
    shadow(panel, "22000")
    text(s, 8.8, 1.0, 3.6, 0.28, "THE OFFER, IN ONE LINE", size=11, color=ROAST, spacing=1.8)
    seal = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(8.85), Inches(1.5), Inches(1.85), Inches(1.85))
    rgb(seal, RGBColor(0xF3, 0xEB, 0xDC))
    seal.line.color.rgb = GOLD
    seal.line.width = Pt(1.25)
    text(s, 8.9, 1.78, 1.75, 0.85, "X%", font=SERIF, size=40, color=LEAF, align=PP_ALIGN.CENTER)
    text(s, 8.9, 2.62, 1.75, 0.3, "BOTH WAYS", size=10, color=ROAST, align=PP_ALIGN.CENTER, spacing=1.4)
    text(s, 8.8, 3.6, 3.6, 1.3, [
        {"text": "Same-day invoice.", "font": SERIF, "size": 28, "color": INK},
        {"text": "Shared benefit.", "font": SERIF, "size": 28, "color": INK, "italic": True},
    ])
    box(s, 8.8, 5.35, 1.55, 0.015, GOLD)
    box(s, 10.6, 5.35, 1.7, 0.015, GOLD)
    text(s, 8.8, 5.5, 1.7, 0.7, [
        {"text": "AT LEAFY BREW", "size": 10, "color": MUTED, "spacing": 1.0},
        {"text": "Action Pro guests save", "size": 13, "color": INK, "bold": True, "before": 4},
    ])
    text(s, 10.55, 5.5, 1.9, 0.7, [
        {"text": "AT ACTION PRO", "size": 10, "color": MUTED, "spacing": 1.0},
        {"text": "Leafy Brew guests save", "size": 13, "color": INK, "bold": True, "before": 4},
    ])
    note(s, 0)


def slide_intro(prs):
    s = new(prs)
    bg(s, CREAM)
    kicker(s, "Introduction")
    text(s, 0.62, 0.78, 11, 1.35, "A collaboration both businesses can use.", font=SERIF, size=40, color=INK)
    text(s, 0.62, 2.15, 11.8, 0.95,
         "This proposal presents a mutually beneficial collaboration between Action Pro and Leafy Brew Coffee & Cafe to increase customer engagement, drive cross-footfall, improve brand visibility, and create a win-win experience for both businesses.",
         size=18, color=MUTED)
    items = [
        ("01", "Engagement", "Give customers a reason to stay longer in the mall and spend with both brands."),
        ("02", "Cross-footfall", "Turn a purchase at one door into a visit at the other, on the same day."),
        ("03", "Visibility", "Place each name where the other already has attention — counter, table, and feed."),
        ("04", "Shared value", "A discount guests understand in one sentence, and staff can apply with ease."),
    ]
    for i, (n, title, body) in enumerate(items):
        x = 0.62 + i * 3.12
        card = box(s, x, 3.35, 2.96, 3.2, IVORY, 0.08)
        shadow(card)
        text(s, x + 0.22, 3.55, 2.5, 0.55, n, font=SERIF, size=28, color=GOLD)
        text(s, x + 0.22, 4.2, 2.5, 0.5, title, font=SERIF, size=24, color=INK)
        text(s, x + 0.22, 4.85, 2.5, 1.3, body, size=14, color=MUTED)
    footer(s, 2)
    note(s, 1)


def slide_vision(prs):
    s = new(prs)
    bg(s, IVORY)
    box(s, 0, 0, 5.55, 7.5, LEAF)
    text(s, 0.5, 0.48, 4.6, 0.3, "ACTION PRO VISION", size=12, color=GOLD_SOFT, spacing=2.2)
    text(s, 0.48, 1.0, 4.7, 1.8, "Grow here. With businesses beside us.", font=SERIF, size=36, color=CREAM)
    text(s, 0.5, 3.05, 4.5, 1.7,
         "Promote what is made in Pakistan. Create work here. Price it so customers can say yes.",
         font=SERIF, size=22, color=GOLD_SOFT, italic=True)
    text(s, 0.5, 5.55, 4.6, 1.4,
         "Action Pro’s vision is to promote Pakistani products, create employment opportunities, support local economic growth, and provide valuable products at affordable prices.",
         size=15, color=RGBColor(0xE4, 0xDD, 0xD4))
    pillars = [
        ("01", "Pakistani products", "Give locally made goods a proper place in everyday retail."),
        ("02", "Employment", "Create jobs in Pakistan as the business grows."),
        ("03", "Customer value", "Make each visit feel worthwhile, useful, and fair."),
        ("04", "Accessible quality", "Offer products people are glad to buy, at prices they can justify."),
        ("05", "Meaningful collaboration", "Grow by standing with other local businesses."),
    ]
    y = 0.42
    for n, title, body in pillars:
        text(s, 5.9, y, 0.7, 0.4, n, font=SERIF, size=20, color=GOLD)
        text(s, 6.65, y, 6.1, 0.36, title, font=SERIF, size=22, color=INK)
        text(s, 6.65, y + 0.38, 6.1, 0.45, body, size=14, color=MUTED)
        y += 1.28
        if n != "05":
            box(s, 5.9, y - 0.18, 6.8, 0.01, RGBColor(0xE0, 0xD3, 0xBA))
    note(s, 2)


def slide_fit(prs):
    s = new(prs)
    bg(s, CREAM)
    kicker(s, "Why this collaboration makes sense")
    text(s, 0.62, 0.75, 12, 1.15, "Two businesses. One kind of customer.", font=SERIF, size=36, color=INK)
    left = box(s, 0.62, 2.1, 5.55, 1.85, COFFEE, 0.08)
    shadow(left)
    right = box(s, 7.15, 2.1, 5.55, 1.85, LEAF, 0.08)
    shadow(right)
    text(s, 6.25, 2.55, 0.85, 0.7, "×", font=SERIF, size=32, color=GOLD, align=PP_ALIGN.CENTER)
    text(s, 0.88, 2.28, 5, 0.25, "ACTION PRO", size=11, color=GOLD_SOFT, spacing=1.6)
    text(s, 0.88, 2.55, 5, 0.5, "Lifestyle retail", font=SERIF, size=26, color=CREAM)
    text(s, 0.88, 3.15, 5, 0.6, "Clothing, makeup, tumblers, crockery, slippers, hair accessories, wallets, purses, and everyday lifestyle pieces.",
         size=13, color=RGBColor(0xE7, 0xDD, 0xD2))
    text(s, 7.4, 2.28, 5, 0.25, "LEAFY BREW", size=11, color=GOLD_SOFT, spacing=1.6)
    text(s, 7.4, 2.55, 5, 0.5, "Coffee & café", font=SERIF, size=26, color=CREAM)
    text(s, 7.4, 3.15, 5, 0.6, "A place to pause, meet, and host — already in the path of people moving through the mall.",
         size=13, color=RGBColor(0xE7, 0xDD, 0xD2))
    fits = [
        ("Lifestyle customers", "Both brands serve people who care how they spend time and money."),
        ("Fuller footfall", "Each visit can send a guest toward the other door today."),
        ("Shared mall", "The audience is already nearby. The offer gives them a reason to cross."),
        ("Stronger visibility", "Each name appears on the other’s counter, table, and social pages."),
        ("Added value", "Customers leave with coffee, a purchase, and a saving they can explain."),
    ]
    for i, (title, body) in enumerate(fits):
        x = 0.62 + i * 2.5
        card = box(s, x, 4.2, 2.38, 2.5, IVORY, 0.1)
        shadow(card)
        text(s, x + 0.16, 4.4, 2.06, 0.7, title, size=15, color=INK, bold=True)
        text(s, x + 0.16, 5.15, 2.06, 1.3, body, size=13, color=MUTED)
    footer(s, 4)
    note(s, 3)


def flow_row(s, y, path, title, steps, hot_fill):
    card = box(s, 0.62, y, 12.1, 1.72, IVORY, 0.08)
    shadow(card)
    text(s, 0.82, y + 0.28, 1.7, 0.24, path, size=11, color=ROAST, spacing=1.4)
    text(s, 0.82, y + 0.52, 1.85, 0.8, title, font=SERIF, size=20, color=INK)
    labels = steps
    xs = [2.85, 6.15, 9.45]
    for i, (head, body, hot) in enumerate(labels):
        fill = hot_fill if hot else WHITE
        fg = CREAM if hot else INK
        sub = RGBColor(0xE4, 0xDD, 0xD4) if hot else MUTED
        step = box(s, xs[i], y + 0.22, 2.85, 1.28, fill, 0.1)
        if not hot:
            step.line.color.rgb = RGBColor(0xE4, 0xD5, 0xBE)
            step.line.width = Pt(1)
        text(s, xs[i] + 0.16, y + 0.38, 2.55, 0.45, head, size=14, color=fg, bold=True)
        text(s, xs[i] + 0.16, y + 0.85, 2.55, 0.5, body, size=12, color=sub)
        if i < 2:
            arrow = s.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, Inches(xs[i] + 2.88), Inches(y + 0.72), Inches(0.38), Inches(0.22))
            rgb(arrow, GOLD)


def slide_model(prs):
    s = new(prs)
    bg(s, CREAM)
    kicker(s, "Collaboration model")
    text(s, 0.62, 0.72, 12, 1.05, "Same day. Same invoice. Agreed discount.", font=SERIF, size=34, color=INK)
    flow_row(s, 1.95, "PATH A", "Retail to café", [
        ("Shop at Action Pro", "Complete a purchase and keep the slip.", False),
        ("Show today’s invoice", "Present it at Leafy Brew, same day.", False),
        ("X% at Leafy Brew", "The agreed café discount.", True),
    ], LEAF)
    flow_row(s, 3.85, "PATH B", "Café to retail", [
        ("Order at Leafy Brew", "Pay, and keep the café receipt.", False),
        ("Show today’s invoice", "Present it at Action Pro, same day.", False),
        ("X% at Action Pro", "The agreed store discount.", True),
    ], COFFEE)
    bar = box(s, 0.62, 5.78, 12.1, 0.95, ESPRESSO, 0.08)
    text(s, 0.9, 5.95, 7, 0.6, "The percentage is a joint decision.", font=SERIF, size=22, color=CREAM, anchor=MSO_ANCHOR.MIDDLE)
    text(s, 8.0, 5.95, 4.4, 0.6, "Set it together, then print it on every stand and post.",
         size=14, color=GOLD_SOFT, anchor=MSO_ANCHOR.MIDDLE)
    footer(s, 5)
    note(s, 4)


def slide_instore(prs):
    s = new(prs)
    bg(s, BEIGE)
    kicker(s, "In-store promotion")
    text(s, 0.62, 0.72, 12, 0.7, "Seen where the guest decides.", font=SERIF, size=34, color=INK)
    tent_l = box(s, 0.62, 1.7, 4.55, 4.95, IVORY, 0.04)
    shadow(tent_l)
    box(s, 0.62, 1.7, 4.55, 0.12, LEAF_MID)
    text(s, 0.9, 2.05, 4.1, 0.3, "TABLE STAND  ·  LEAFY BREW", size=12, color=ROAST, spacing=1.2)
    text(s, 0.9, 2.6, 4.0, 2.4, "Shop at Action Pro today and enjoy X% off at Leafy Brew.", font=SERIF, size=28, color=INK)
    text(s, 0.9, 5.7, 4.0, 0.4, "SAME-DAY ACTION PRO INVOICE", size=12, color=MUTED, spacing=1.1)

    tent_r = box(s, 5.4, 1.7, 4.55, 4.95, IVORY, 0.04)
    shadow(tent_r)
    box(s, 5.4, 1.7, 4.55, 0.12, ROAST)
    text(s, 5.68, 2.05, 4.1, 0.3, "COUNTER SIGN  ·  ACTION PRO", size=12, color=ROAST, spacing=1.2)
    text(s, 5.68, 2.6, 4.0, 2.4, "Enjoy X% off at Action Pro with your same-day Leafy Brew invoice.", font=SERIF, size=28, color=INK)
    text(s, 5.68, 5.7, 4.0, 0.4, "WE COLLABORATE", size=12, color=MUTED, spacing=1.1)

    places = [
        ("Table stand", "On Leafy Brew tables."),
        ("Counter sign", "At the Action Pro till."),
        ("Display signage", "Eye level, near each entrance."),
        ("“We Collaborate”", "One shared mark, both offers."),
        ("Small placements", "Quiet support for the main sign."),
    ]
    for i, (title, body) in enumerate(places):
        y = 1.7 + i * 1.0
        card = box(s, 10.15, y, 2.55, 0.9, IVORY, 0.12)
        shadow(card)
        text(s, 10.3, y + 0.1, 2.25, 0.32, title, size=13, color=INK, bold=True)
        text(s, 10.3, y + 0.42, 2.25, 0.38, body, size=12, color=MUTED)
    footer(s, 6)
    note(s, 5)


def slide_events(prs):
    s = new(prs)
    bg(s, CREAM)
    kicker(s, "Event collaboration")
    text(s, 0.62, 0.7, 12, 1.15, "More value on the days Leafy Brew brings people together.", font=SERIF, size=32, color=INK)
    points = [
        ("01", "A stronger event offer", "When Leafy Brew hosts or facilitates an event, the partnership adds a benefit beyond the room and the coffee."),
        ("02", "Useful for organisers", "Organisers can tell attendees that collaborating with Leafy Brew also opens a discount at Action Pro."),
        ("03", "A better guest day", "Attendees leave with the event, the café, and a same-day saving next door."),
        ("04", "Action Pro stands behind it", "The store supports the event with discounts across the categories guests already shop."),
    ]
    for i, (n, title, body) in enumerate(points):
        y = 2.05 + i * 1.15
        card = box(s, 0.62, y, 7.15, 1.05, IVORY, 0.1)
        shadow(card)
        text(s, 0.82, y + 0.18, 0.6, 0.5, n, font=SERIF, size=20, color=GOLD)
        text(s, 1.5, y + 0.12, 6.0, 0.34, title, size=16, color=INK, bold=True)
        text(s, 1.5, y + 0.48, 6.0, 0.48, body, size=13, color=MUTED)
    panel = box(s, 8.0, 2.05, 4.7, 4.55, LEAF, 0.08)
    shadow(panel)
    text(s, 8.28, 2.25, 4.2, 0.25, "ACTION PRO CATEGORIES", size=11, color=GOLD_SOFT, spacing=1.4)
    text(s, 8.28, 2.55, 4.2, 1.0, "The discount can travel with the guest.", font=SERIF, size=24, color=CREAM)
    cats = ["Clothing", "Makeup", "Tumblers", "Crockery", "Slippers", "Hair accessories", "Wallets", "Purses"]
    for i, name in enumerate(cats):
        col = i % 2
        row = i // 2
        x = 8.28 + col * 2.1
        y = 3.75 + row * 0.65
        pill = box(s, x, y, 1.98, 0.52, RGBColor(0x27, 0x4A, 0x3E), 0.2)
        pill.line.color.rgb = RGBColor(0xC6, 0xA1, 0x5B)
        pill.line.width = Pt(0.75)
        text(s, x, y + 0.1, 1.98, 0.32, name, size=13, color=CREAM, align=PP_ALIGN.CENTER)
    footer(s, 7)
    note(s, 6)


def slide_leafy(prs):
    s = new(prs)
    bg(s, CREAM)
    kicker(s, "Benefits for Leafy Brew")
    text(s, 0.62, 0.7, 12, 0.7, "A café guests choose because the day gets better.", font=SERIF, size=32, color=INK)
    items = [
        ("01", "More footfall", "Action Pro shoppers have a concrete reason to come in today."),
        ("02", "A reason to visit", "The discount makes the walk to Leafy Brew feel worthwhile."),
        ("03", "Mall presence", "Shared signage carries the café name into the retail path."),
        ("04", "Richer visits", "Coffee plus a same-day saving feels like a better outing."),
        ("05", "Collaborative image", "Guests see a café that partners with the businesses beside it."),
        ("06", "Event appeal", "Organisers can offer attendees something extra from Action Pro."),
        ("07", "Social visibility", "Joint posts introduce Leafy Brew to Action Pro’s audience."),
        ("08", "Real referrals", "Every valid receipt arrives as a personal invitation."),
    ]
    for i, (n, title, body) in enumerate(items):
        col, row = i % 4, i // 4
        x = 0.62 + col * 3.15
        y = 1.7 + row * 2.5
        card = box(s, x, y, 3.02, 2.35, IVORY, 0.08)
        shadow(card)
        box(s, x, y, 3.02, 0.06, LEAF_MID)
        text(s, x + 0.18, y + 0.2, 2.6, 0.4, n, font=SERIF, size=18, color=GOLD)
        text(s, x + 0.18, y + 0.65, 2.65, 0.5, title, size=16, color=INK, bold=True)
        text(s, x + 0.18, y + 1.2, 2.65, 0.9, body, size=13, color=MUTED)
    footer(s, 8)
    note(s, 7)


def slide_action(prs):
    s = new(prs)
    bg(s, ESPRESSO)
    kicker(s, "Benefits for Action Pro", dark=True)
    text(s, 0.62, 0.72, 12, 1.0, "A store the café’s guests already have a reason to enter.", font=SERIF, size=32, color=CREAM)
    items = [
        ("01", "More store visits", "Café guests are invited across while the receipt is still from today."),
        ("02", "Walk-ins with intent", "They arrive holding a slip and a reason to browse."),
        ("03", "A lifestyle café beside us", "The store is seen with a coffee brand people already enjoy."),
        ("04", "A stronger local image", "A visible partnership shows roots among neighbouring businesses."),
        ("05", "A café audience", "People who came for coffee discover the range."),
        ("06", "Loyalty with a purpose", "Returning is tied to a saving that is simple to explain."),
        ("07", "Public social proof", "Joint posts show the collaboration is active and easy to trust."),
    ]
    for i, (n, title, body) in enumerate(items):
        col = i % 2
        row = i // 2
        x = 0.62 + col * 6.35
        y = 1.9 + row * 1.2
        text(s, x, y, 0.7, 0.45, n, font=SERIF, size=20, color=GOLD)
        text(s, x + 0.75, y, 5.2, 0.36, title, font=SERIF, size=20, color=CREAM)
        text(s, x + 0.75, y + 0.38, 5.2, 0.5, body, size=13, color=RGBColor(0xD5, 0xCB, 0xBE))
    footer(s, 9, dark=True)
    note(s, 8)


def slide_social(prs):
    s = new(prs)
    bg(s, CREAM)
    kicker(s, "Social media & marketing support")
    text(s, 0.62, 0.7, 12, 1.05, "One announcement. Then the mall and the feed match.", font=SERIF, size=32, color=INK)
    posts = [
        (ESPRESSO, CREAM, GOLD_SOFT, "JOINT POST  ·  LAUNCH", "A new reason to visit both.",
         "Action Pro and Leafy Brew open a same-day offer. Show today’s invoice. Receive the agreed discount."),
        (IVORY, INK, ROAST, "STORY  ·  HOW TO CLAIM", "Shop. Keep the slip. Show it today.",
         "Three beats, told in both brands’ stories, so guests know the offer before the counter."),
        (IVORY, INK, ROAST, "AWARENESS", "X% off, both ways.",
         "Short posts that name the rate once it is agreed, and show the stand guests will see."),
    ]
    for i, (fill, fg, kick, label, title, body) in enumerate(posts):
        x = 0.62 + i * 4.2
        card = box(s, x, 1.95, 4.0, 2.85, fill, 0.08)
        shadow(card)
        text(s, x + 0.24, 2.12, 3.5, 0.28, label, size=11, color=kick, spacing=1.1)
        text(s, x + 0.24, 2.5, 3.5, 0.9, title, font=SERIF, size=22, color=fg)
        sub = RGBColor(0xD9, 0xD0, 0xC4) if fill == ESPRESSO else MUTED
        text(s, x + 0.24, 3.5, 3.5, 1.05, body, size=13, color=sub)
    channels = [
        ("Standees & store visuals", "The physical signs repeat the line used online."),
        ("Collaborative branding", "Both names, one offer, a shared We Collaborate mark."),
        ("A calm campaign rhythm", "A launch push, then steady reminders that keep the offer visible."),
    ]
    for i, (title, body) in enumerate(channels):
        x = 0.62 + i * 4.2
        card = box(s, x, 5.0, 4.0, 1.15, WHITE, 0.1)
        card.line.color.rgb = RGBColor(0xE0, 0xD0, 0xB4)
        card.line.width = Pt(1)
        text(s, x + 0.22, 5.12, 3.55, 0.35, title, size=14, color=INK, bold=True)
        text(s, x + 0.22, 5.5, 3.55, 0.5, body, size=13, color=MUTED)
    footer(s, 10)
    note(s, 9)


def slide_mou(prs):
    s = new(prs)
    bg(s, IVORY)
    kicker(s, "Proposed MOU")
    text(s, 0.62, 0.7, 8, 0.65, "Short terms. Clear duties.", font=SERIF, size=34, color=INK)
    terms = [
        ("01", "Agreed discount", "Both businesses set the percentage before anything is printed or posted."),
        ("02", "Same-day invoice", "The offer applies when the guest presents a receipt from that calendar day."),
        ("03", "Mutual promotion", "Each partner carries the other in-store and on social media."),
        ("04", "Events included", "Leafy Brew event attendees can be welcomed on the same terms."),
        ("05", "A signed MOU", "Responsibilities, duration, and how the offer is honoured are written down."),
        ("06", "Periodic review", "Both partners revisit the collaboration and refine what should work harder."),
    ]
    for i, (n, title, body) in enumerate(terms):
        y = 1.55 + i * 0.85
        text(s, 0.62, y, 0.6, 0.4, n, font=SERIF, size=18, color=GOLD)
        text(s, 1.3, y, 2.3, 0.55, title, size=15, color=INK, bold=True, anchor=MSO_ANCHOR.MIDDLE)
        text(s, 3.6, y, 5.15, 0.7, body, size=13, color=MUTED, anchor=MSO_ANCHOR.MIDDLE)
        if i < 5:
            box(s, 0.62, y + 0.72, 8.1, 0.008, RGBColor(0xE0, 0xD3, 0xBA))
    panel = box(s, 9.05, 1.55, 3.65, 5.05, ESPRESSO, 0.08)
    text(s, 9.3, 1.78, 3.2, 0.25, "TO CONFIRM TOGETHER", size=11, color=GOLD_SOFT, spacing=1.2)
    text(s, 9.3, 2.15, 3.2, 1.0, "The decisions that launch this.", font=SERIF, size=24, color=CREAM)
    confirms = [
        ("DISCOUNT", "X% at Leafy Brew and X% at Action Pro"),
        ("DURATION", "A term both businesses are comfortable signing"),
        ("LAUNCH", "Stands, staff briefing, and the first posts together"),
        ("REVIEW", "A review date both partners put on the calendar"),
    ]
    for i, (label, body) in enumerate(confirms):
        y = 3.3 + i * 0.75
        text(s, 9.3, y, 3.2, 0.22, label, size=11, color=GOLD_SOFT, spacing=1.1)
        text(s, 9.3, y + 0.24, 3.2, 0.42, body, size=13, color=CREAM)
    footer(s, 11)
    note(s, 10)


def slide_close(prs):
    s = new(prs)
    bg(s, ESPRESSO)
    text(s, 0.8, 1.35, 11.7, 0.3, "CLOSING", size=13, color=GOLD_SOFT, align=PP_ALIGN.CENTER, spacing=3)
    text(s, 1.1, 1.85, 11.1, 1.5, "Let’s build a win-win collaboration.",
         font=SERIF, size=44, color=CREAM, align=PP_ALIGN.CENTER)
    text(s, 2.0, 3.45, 9.3, 1.05,
         "Together, Action Pro and Leafy Brew can create more value for customers, increase visibility, and support each other’s growth through a practical and lively partnership.",
         size=18, color=RGBColor(0xE4, 0xDB, 0xD0), align=PP_ALIGN.CENTER)
    text(s, 1.4, 4.6, 10.5, 0.5, "We look forward to partnering with Leafy Brew Coffee & Cafe.",
         font=SERIF, size=22, color=GOLD_SOFT, italic=True, align=PP_ALIGN.CENTER)
    steps = [("01", "Agree the percentage"), ("02", "Sign a short MOU"), ("03", "Launch stands and the first post")]
    for i, (n, label) in enumerate(steps):
        x = 1.55 + i * 3.6
        card = box(s, x, 5.45, 3.3, 0.95, RGBColor(0x1E, 0x19, 0x15), 0.12)
        card.line.color.rgb = RGBColor(0x8C, 0x73, 0x45)
        card.line.width = Pt(1)
        text(s, x + 0.2, 5.55, 2.9, 0.22, n, size=11, color=GOLD, spacing=1.2)
        text(s, x + 0.2, 5.82, 2.9, 0.4, label, size=15, color=CREAM)
    note(s, 11)


def main():
    prs = Presentation()
    prs.slide_width = Inches(W)
    prs.slide_height = Inches(H)
    prs.core_properties.title = "Partnership Collaboration Proposal — Action Pro × Leafy Brew Coffee & Cafe"
    prs.core_properties.subject = "Same-day discount partnership proposal"
    prs.core_properties.author = "Action Pro"
    prs.core_properties.category = "Partnership proposal"
    for builder in (
        slide_cover, slide_intro, slide_vision, slide_fit, slide_model, slide_instore,
        slide_events, slide_leafy, slide_action, slide_social, slide_mou, slide_close,
    ):
        builder(prs)
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Action-Pro-x-Leafy-Brew-Partnership.pptx")
    prs.save(out)
    print(out)


if __name__ == "__main__":
    main()
