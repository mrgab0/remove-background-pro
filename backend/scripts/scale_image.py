import sys
from PIL import Image
import os

if __name__ == "__main__":
    input_path = sys.argv[1]
    scale_factor = int(sys.argv[2])
    output_path = os.path.splitext(input_path)[0] + "_scaled.png"
    
    image = Image.open(input_path)
    new_size = (image.width * scale_factor, image.height * scale_factor)
    
    scaled_image = image.resize(new_size, Image.LANCZOS)
    scaled_image.save(output_path)
    
    print(output_path)
