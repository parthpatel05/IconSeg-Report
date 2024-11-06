import os
import shutil
import random

# Paths to original and new directories
train_dir = 'cityscapes/train'
test_dir = 'cityscapes/test'
subdirs = ['depth', 'image', 'label']

# Create the test directories if they don't exist
os.makedirs(test_dir, exist_ok=True)
for subdir in subdirs:
    os.makedirs(os.path.join(test_dir, subdir), exist_ok=True)

# Define the percentage of data to be moved to the test set
test_percentage = 0.2

# Get list of files in the 'image' subdirectory
train_image_dir = os.path.join(train_dir, 'image')
image_files = os.listdir(train_image_dir)

# Randomly select files for the test set
test_files = random.sample(image_files, int(len(image_files) * test_percentage))

# For each file in the test set, move corresponding files in depth, image, and label
for file_name in test_files:
    for subdir in subdirs:
        src_path = os.path.join(train_dir, subdir, file_name)
        dest_path = os.path.join(test_dir, subdir, file_name)
        shutil.move(src_path, dest_path)  #
