import torch
import torchvision.transforms as transforms
from PIL import Image

# Load the ESRGAN model
model = torch.load('esrgan_model.pth', map_location=torch.device('cpu'))

# Set the model to evaluation mode
model.eval()

# Define the image transformation pipeline
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

# Load the input image
input_image = Image.open('input_image.png')

# Apply the transformation pipeline to the input image
input_tensor = transform(input_image).unsqueeze(0)

# Generate the enhanced image using the ESRGAN model
with torch.no_grad():
    output_tensor = model(input_tensor)

# Convert the output tensor to a PIL image
output_image = transforms.ToPILImage()(output_tensor.squeeze(0).clamp(0.0, 1.0))

# Save the output image
output_image.save('output_image.png')
