# Cursor.js 
# A fancy cursor for your website
# GitHub: https:///www.github.com/cursor.js
# Licence: GNU General Public License v3.0
# By: 0x4248
#
# Makefile for Cursor.js


PYTHON = python3

TOOLS = tools

all: minify

minify:
	$(PYTHON) $(TOOLS)/minify.py

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  minify  Minify the Cursor.js source code"
	@echo "  help    Show this help message"