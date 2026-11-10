"""A claim passes if its exact words were on the site Russell wrote (commit e50b85a)."""
import subprocess, sys
text = sys.argv[1]
source = subprocess.run(["git", "show", "e50b85a:index.html"], capture_output=True, encoding="utf-8", check=True).stdout
assert text in source, f"not in e50b85a:index.html: {text}"
print(f"found in e50b85a:index.html: {text}")
