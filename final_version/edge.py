import numpy as np
import cv2
import csv
import sys

# open image
filename = str(sys.argv[1])
img = cv2.imread("image/"+filename)

# gray
gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# blur
blur_img = cv2.GaussianBlur(gray_img, (11, 11), 0)

# Edge detection
edges = cv2.Canny(blur_img, int(sys.argv[2]), int(sys.argv[3])) #40~90

# thicken the edges
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
edges = cv2.dilate(edges, kernel, iterations=1)


# write img
cv2.imwrite("image/out_"+filename, edges)

# csv name
new_file_name = filename[:-4]
print(new_file_name)

# transfer coordinates to csv
indices = np.where(edges != [0])

# shuffle the order of coordinate
lst = list(range(len(indices[0])))
np.random.shuffle(lst)

# open input csv
file = open('csv/'+new_file_name+'.csv', 'w')
writer = csv.writer(file)

# img setting into csv
h, w = edges.shape
width_height = [int(w),int(h)]
data = width_height
writer.writerow(data)
for i in lst:
    data = [indices[0][i], indices[1][i]]
    writer.writerow(data)
file.close()

