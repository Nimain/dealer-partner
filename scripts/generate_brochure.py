#!/usr/bin/env python3
"""
Holatractor - Multi-Language Dealer Brochure Generator (Spanish & English)
Generates:
1. public/holatractor-dealer-brochure-es.pdf (Spanish)
2. public/holatractor-dealer-brochure-en.pdf (English)
3. public/holatractor-dealer-brochure.pdf (Default Spanish / LatAm copy)
4. public/images/brochure/previews/page_1.png ... page_12.png (150 DPI UI Previews)
"""

import os
import sys
import shutil

# Ensure scripts directory and project root are on path
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
sys.path.insert(0, SCRIPT_DIR)
sys.path.insert(0, PROJECT_ROOT)

import generate_brochure_es as gen_es
import generate_brochure_en as gen_en

def main():
    lang = "both"
    if len(sys.argv) > 1:
        lang = sys.argv[1].lower().replace("--", "")

    if lang in ["es", "spanish", "both"]:
        print("\n--- Generating Spanish Brochure ---")
        gen_es.build_brochure_pdf("public/holatractor-dealer-brochure-es.pdf")
        shutil.copyfile("public/holatractor-dealer-brochure-es.pdf", "public/holatractor-dealer-brochure.pdf")
        print("Copied to public/holatractor-dealer-brochure.pdf")

    if lang in ["en", "english", "both"]:
        print("\n--- Generating English Brochure ---")
        gen_en.build_brochure_pdf("public/holatractor-dealer-brochure-en.pdf")

    print("\nAll brochures generated successfully.")

if __name__ == "__main__":
    main()
