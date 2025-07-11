import sys
from rembg import remove
from PIL import Image
import os

if __name__ == "__main__":
    input_path = sys.argv[1]
    output_path = os.path.splitext(input_path)[0] + "_processed.png"
    
    input_image = Image.open(input_path)
    output_image = remove(input_image)
    
    output_image.save(output_path)
    
    print(output_path)
