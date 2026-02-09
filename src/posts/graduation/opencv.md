---
icon: pen-to-square
date: 2026-01-06
category:
  - 毕业设计
tag:
  - OpenCV
---
# OpenCV
intel公司的一个计算机视觉cv的开源库，基于c++实现，为C++、python、java都提供接口，还在不断发展。
python的opencv库里面的数组结构都是Numpy的数组。
## 数字图像
我们计算机处理的都是数字图像，是由离散像素组成的，分类如下：
位图：每个像素只有0（黑）和1（白）
灰度图：每个像素由一个8位（0-255）数字表示，0表示纯黑，255表示纯白
彩色图：有RGB三个分量，每个分量范围都是0-255，三个分量合成彩色
## 安装
我用的python，建议下一个anaconda，在虚拟环境里面先安装numpy和matplotlib，执行pip install opencv-python以及pip install opencv-contrib-python（扩展库）。要注意的是3.4以上的版本很多经典算法由于版权原因，他会收费，所以建议下载3.4以下的版本。
## 模块
主要有三个基本模块：
- core：实现最核心的数据结构及其基本运算，如绘图函数、数组操作相关函数。
- highgui：实现了视频与图像的读取显示存储等接口
- imgproc：图像处理的基本方法，包括图像滤波、图像几何变换、平滑、阈值分割、形态学处理、边缘检测、目标检测、运动分析和对象跟踪等。
其他模块：
- features2d：用于提取图像特征以及特征匹配，nonfree模块实现了一些专利算法，如sift特征，这不是免费的，但是3.4以下的版本没有这个模块，可以用。
- objdetect：目标检测的功能，经典的基于Hear、LBP特征的人脸检测，基于HOG的行人汽车检测，分类器使用Cascade Classification（级联分类）和Latent SVM等
- stitching：实现图像拼接，一般是那些遥感瓦片图片的拼接
- FLANN模块：快速近似最近邻搜索FLANN和聚类Clustering算法。
- ml模块机器学习模块
- photo模块包含图像修复和图像去噪两部分
- video模块针对视频处理，如北京分离，前景检测、对象跟踪等
- calib3d模块即calibration（校准）3D，主要是相机校准和三维重建相关的内容，包含了基本的多视角集合算法，单个立体摄像头标定，物体姿态估计，立体相似性算法，3D信息重建等
- G-API模块包含超搞笑的图像处理pipeline引擎
## 基本操作
### 图像的IO操作：读取和处理保存
#### 读取图像
```python
cv.imread()
```
参数：
- 要读取的图像
- 读取方式的标志：
  - cv.IMREAD*COLOR：以彩色方式加载图像，任何图像的透明度都将被忽略，这是默认参数
  - cv.IMREAD*GRAYSCALE:以灰度模式加载图像
  - cv.IMREAD_UNCHANGED:包括alpha通道的加载图像模式
可以使用1、0、-1来代替上面三个标志
示例：
```python
import numpy as np
import cvs as cv
img = cv.imread('test.jpg',0)
```
注意如果路径错误不会报错，而是返回一个none值
#### 显示图像
在matplotlib中用imshow()也能展示图像，这里我们只讨论cv
```python
cv.imshow()
```
参数：
- 显示图像的窗口名称，String类型
- 要加载的图像
要注意的是：在调用显示图像的API后，要调用cv.waitKey()为图像绘制留下时间，否则窗口会出现无响应情况，并且图像无法显示出来
参考代码：
```python
import cv2 as cv
import numpy as np
import matplotlib.pyplot as plt

img = cv.imread("ideabkgdmob.jpg",0)
cv.imshow('image',img)
# 0表示一直等待，其他数字表示等待ms
cv.waitKey(0)
# matplotlib中展示
img = cv.imread("ideabkgdmob.jpg",1)
# cv中图象是BGR形式，所以要将通道反转
plt.imshow(img[:,:,::-1])
plt.show()
```
#### 保存图片
```python
cv.imwrite()
```
参数:
- 文件名，保存路径
- 要保存的图像
参考代码：
```python
cv.imwrite('savetest.png',img)
```
### 在图像上绘制几何图形
#### 绘制直线
```python
cv.line(img, start, end, color, thickness)
```
参数:
- img:图像
- start：起点坐标
- end：终点坐标
- color：颜色
- Thickness：线条宽度
#### 绘制圆形
```python
cv.circle(img,centerpoint, r, color, thickness)
```
参数：
- centerpoint：圆心坐标
- r：半径大小
#### 绘制矩形
```python
cv.rectangle(img, leftupper, rightdown, color, thickness)
```
参数：
- leftupper：左上角坐标
- rightdown：右下角坐标
### 往图像上添加文字
```python
cv.putText(img, text, station, font, fontsize, color, thickness, cv.LINE_AA)
```
参数：
- text：文本数据
- station：文本放置位置
- font:字体
- Fontsize：字体大小
### 获取图像属性
图像属性：
- img-shape：形状
- img-size：图像大小(像素数)
- img-dtype:数据类型（比如uint8）
### 访问图像的像素 
可以通过行和列的坐标值获取该像素点的像素值，如果是BGR图像返回一个数组。如果是灰度图像，进返回相应的轻度之。
```python
import numpy as np
import cv2 as cv
img = cv.imread('test.png')
# 获取某个像素点的值
px = img[100, 100]
# 获取像素点蓝色通道的值,前两个表示行列值，0表示蓝色通道
blue = img[100, 100, 0]
# 修改某个位置的像素值
img[100,100] = [255, 255, 255]
```
### 进行通道分离合并
有时需要在BGE通道图像上单独工作，这种情况下需要将BGR图像分割为单个通道。或者在其他情况下，可能需要将单独的通道合成BGR图像。
```python
# 通道拆分
b,g,r = cv.split(img)
# 通道合并
img = cv.merge((b,g,r))
```
### 实现颜色空间的变换
OpenCV有150多种颜色空间转换方法。最广泛使用的有两种，`BGR <-> Gray` (彩色图和灰度图转换)以及 `BGR <-> HSV` (HSV在某些算法中比BGR要好一点)
```python
cv.cvtColor(input_image, flag)
```
参数：
- input_image:进行色彩空间转换的图片
- flag:转换类型
  - cv.COLOR_BGR2GRAY:`BGR <-> Gray`
  - cv.COLOR_BGR2HSY:`BGR <-> HSV`

### 图像的算术运算
#### 图像的加法
可以使用OpenCv的`cv.add()`函数把两幅图相加，也可以简单地用numpy操作添加两个图象，如`res = img1 + img2`。两个图象要有相同的大小和类型，或者第二个图象可以是标量。
**注意：OpenCV和Numpy的加法不一样，CV的加法是饱和操作，Numpy添加是模运算**
一般来说图像操作还是cv的相加效果更好
```python
# 举例
x = np.uint8([250])
y = np.uint8([10])
# cv的相加，包和运算，因为灰度图的像素值是0-255，所以250+10 = 260 > 255,饱和后取255，最后输出255
print(cv.add(x,y))
# Numpy的相加操作，250 + 10 % 256 = 4.对256取模
print(x + y)
```
##### 图像的混合
**提示：在图像融合中，常用 cv2.addWeighted(图像一, 权重一, 图像二, 权重二, γ) 来实现带权重的加法（如：$y = \alpha \cdot x_1 + \beta \cdot x_2 + \gamma$）**
公式:g(x) = (1 - $\alpha f_1(x)$) + $\alpha f_2(x)$,α的值为0-1。
#### 图像的减法、乘法除法
*图像减法 (Subtraction)*
用于检测两张图片之间的差异（如运动检测）。
OpenCV (cv2.subtract): 如果结果小于 0，则设为 0（变为黑色）。
代码示例: `diff = cv2.subtract(img1, img2)`

*图像乘法与除法 (Multiplication & Division)*
这两种运算虽然不如加减法常用，但在特定场景下非常关键。
乘法 (cv2.multiply): 常用于调整对比度或应用掩码（Mask）。
例如：将图像与系数 1.5 相乘可提高亮度/对比度。
除法 (cv2.divide): 常用于归一化、光照补偿或提取图像之间的比例关系。
例如：校正光照不均匀的底片。
## 几何变换
图像的缩放、平移、旋转等，了解数字图像的仿射变换和透射变换
### 图像缩放
对图像的大小进行调整，放大缩小
```python
import cv2 as cv
cv.resize(src,dsize,fx = 0,fy = 0, interpolation = cv.INTER_LINEAR)
```
参数：
- src：输入图像
- dsize：绝对尺寸，直接指定调整后图像的大小
- fx，fy：使用时将dsize设none，将fx和fy设置为比例因子即可
- interpolation：插值方法

| 插值常量 | 含义 | 常用场景 |
| :--- | :--- | :--- |
| `cv2.INTER_LINEAR` | **双线性插值法** | 默认方式，放大图像时效果较好，速度均衡 |
| `cv2.INTER_NEAREST` | **最近邻插值** | 速度最快，但放大后锯齿感强，常用于掩码处理 |
| `cv2.INTER_AREA` | **像素区域重采样** | **缩小图像**时的首选，能避免波纹和噪点 |
| `cv2.INTER_CUBIC` | **双三次插值** | 放大图像时效果最细腻，但计算开销较大 |
```python
rows, cols = mob.shape[:2]
print(type(rows), cols)

# 绝对尺寸
res = cv.resize(mob, (int(0.5 * cols), int(2 * rows)))
plt.imshow(res[:,:,::-1])

# 相对尺寸
res1 = cv.resize(mob, None, fx = 0.5, fy = 0.1)
plt.imshow(res1[:,:,::-1])
```
### 图像平移


