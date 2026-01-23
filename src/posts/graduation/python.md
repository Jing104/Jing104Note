---
icon: pen-to-square
date: 2026-01-06
category:
  - 毕业设计
tag:
  - python
---
# python
python无需多言，热度第一语言，解释型语言，高级语言，所有地方都能用，语法简单易上手，在我看来更适合用于做脚本工具和计算。最常用的内置函数是print，可以用import来导入库，可以用as给库重命名，但是要注意的是调用库函数时，要加上库名（或者as的别名），不然解释器不知道你用的是哪个函数。
## 变量
整数、浮点数、布尔、None（空值）、字符串
变量不需要指定类型，解释器会自己辨别。如：`a = 1`。查看某个变量类型可以用type函数，如`print(type(a))`。
## 方法和函数
- 方法是`对象.方法名()`这样子用，可以说方法是对象这个类自带的。
- 函数一般是对其他的对象进行操作，操作后生成一个对象。它可以减少重复操作，定义函数时如下
```python
def func(参数1, 参数2, ...):
  #执行语句，里面的变量是局部的，外部拿不到
  执行语句1
  执行语句2
  #return 具体的数据，如果不写return则是返回None值
  retuen 变量
```
## 可变与不可变
列表是一个可变的对象，对其使用方法后比如`list = [1 , 2] list.append(3)`，这个list就会改变（[1, 2, 3]）；但是像int float str bool等是不可变的，对其使用方法后原来的值不会变比如`s = "Hello" s.upper()`这个时候s还是Hello，只有`s = s.upper()`如此赋值之后才会改变原来的s。
## 注释
没得说，用来帮你和别人看懂代码防止遗忘。在python中你可以用`#`来注释单行，也可以用`''' '''`来注释多行，快捷键是` ctrl + /`。
## 模式
python提供两种模式：
- 交互式模式：你写一行，回车，就会运行一行。
`这种模式更适合你玩一玩，在命令行输入python3就会进入该模式（以>>>为标志），模式中输入quit()函数就能退出。每写一行就会执行一行很直观，执行命令不需要print就会显示结果，但是退出之后东西就都没了。`
- 命令行模式：写完代码命令执行。
## 输入
输出函数print()很常见很简单，但是输入就有点小复杂了。
输入函数是input()，可以在里面加上打印信息,比如`input("请输入你的年龄：")`。这个函数的返回值是一个字符串类型，所以可以通过变量来获取，比如`age = input("请输入你的年龄：")`,但是这样又有一个问题，我们在计算年龄的时候，年龄是数字才能运算，字符串不能参与数字运算，那么就要用到python内置的类型转换函数。
## 转换函数
其实很简单，就是将变量类型名作为函数了，常用的有`int(),float(),str(),bool()`，但是要注意输入的参数必须符合转换的要求，比如`int("666")`，如果是`int("我不是整数")`就会报错。
## 条件语句
```
if 条件:
    执行语句
elif 条件:
    执行语句
else:
    执行语句
```
要注意的是python还是太精简了，条件也不需要用`{}`包起来，执行语句要缩进表示，else if都简化成`elif`了，可以直接一个语句表示范围比如`10 < a <= 18,不用写两个条件来and`,逻辑运算符符都给你具象化了，比如`&& 变成了 and,||变成了 or，!变成了not`。
## 逻辑运算符
上边有提到，与或非分别用 and、or、not表示，优先级是not > and > or，当然可以用括号改变优先级。
## 列表
list = [1, 2, 3],如此定义，列表没有泛型，里面可以存储多种不同类型的对象。列表是不可变的类型。
## 元组
a = (1, 2, 3)，如此定义，元组和列表很相似，唯一的区别是元组不可变，那为什么会有这个呢，下面会说明其一个用途。
## 字典
contact = {"yzj":"123456789","chy":"987654321"}，如此定义，其实可以看出字典类似于map是键值对的集合，不同的是没有泛型约束，字典是可变类型，但是字典的键是要求不可变类型，那么如果有一个通讯录，要录入其电话号码，但是有多个名字叫张伟的人，列表[张伟, 1]是不能用的，因为列表是可变的，所以上面说的元组就排上用场了。他可以用contact[key] = xxx来赋值或者覆盖数据。可以用 xxx（key） in contact这个bool值来判断他是否在字典中。
## for循环
for 循环，其实很简单，只是python中的语法不同，python中使用 for 变量名 in 范围:，进行遍历，变量名会指代范围中的每一个对象。通常会和range一起使用，range(左边界,右边界,步长),左边界和右边界是左开右闭的。
## while循环
while条件不是我们设置范围，而是根据条件确定何时循环。while 条件:执行语句。在有明确的范围或者循环次数的时候for更加方便，while更通用。
## 格式化字符串
如果输出时使用+号来连接字符串，很麻烦，也不够通用，这个时候就可以用format()来格式化字符串。一般可以用位置，比如`print("我的年龄是{0},我的出生年月是{1}".format("18","2004"))`,这里的0就代表format函数中的第一个参数，也就是18，1就代表第二个了。当然也可以用关键字来表示，比如`print("我的年龄是{age},我的出生年月是{year}".format(year = "2004",age = "18"))`,这个时候因为有关键字year和age，所以位置就不重要了，值也可以用具体的变量表示。除了可以表示字符串以外，浮点数、布尔数也可以传入。可以用`.数字f`等表示保留多少位，比如`print("this is a {0:.2f}".format(4.222))`就是打印`this is a 4.22`（注意会四舍五入）。除了使用.format()方法之外，也可以用f做开头，比如`a = 123    print(f"this is a {a}")`
## 模块引入
有三种方式
- import A 这样做时，如果要用A里面的函数，必须要带上这个模块名，比如A.test()。
- from A import a,b 这样做时，可以只引入模块A中的部分函数，并且可以直接a(),不需要加模块名
- from A import * 这样做时，会把所有的函数引入且使用时不需要加模块名，但是一般不这样使用，一方面是因为全部引入影响性能，另一方面是因为当多个模块具有同名方法时，会发生混乱。
## 类
python也有面向对象的思想，类定义如下
```python
class Cat:
  def _init_(self,...其他参数):
    self.name = "huahua"
    self.age = 3
  def spark(self,...其他参数):
    print("mow" * self.age)

```
## 继承
python也有继承，因为类的属性是在方法中定义的，所以类继承可以通俗的理解为继承方法。当调用一个子类的方法时，会先看这个子类是否有方法，如果有就调用，如果子类没有该方法就回去调用父类中的方法。
子类继承父类的语法也很奇特，class 子类名(父类名): ,构造方法也属于方法，所以子类没有构造方法时就会直接调用父类的，那么如果子类除了要继承父类的属性自己还有额外的属性时，就得使用super()了，具体如下
```python
class Mammal():
  def __init__(self,name,sex):
    self.name = name
    self.sex = sex
  def eat(self):
    print(f"{self.name}正在吃")
class Human(Mammal):
  def __init__(self,name,sex,job):
    super().__init__(name,sex)
    self.job = job

human = Human("zhangsan", "famale", "coder")
human.eat()
```
## 文件操作
文件能够读和写
无论是读和写都要先打开文件，python使用open(文件路径，读写模式，encoding = 编码方式)来打开文件，返回的是一个文件对象。比如`f = open("./test/txt", "r", encoding = "UTF-8")`,这里的"r"代表读，同理"w"则代表写，不写这个参数的话默认是r。每次我们对文件操作完之后一定要关闭文件，使用close()方法。比如`f.close()`。但是这样的话容易忘记关闭文件，所以可以如下使用：
```python
#使用with关键字调用open函数打开相应文件，并将其赋值给变量f
with open("./test/txt", "r", encoding = "UTF-8") as f:
  #缩进表示执行相关操作
  print(f.read())
  print(f.readline())
```
读操作（“r”）：读操作是从文件中读取内容，当读到文件末尾时会返回一个空字符`''`，注意不是None
- read():括号内如果不传表示会读取所有内容，内存可能会炸掉。可以传入int参数，表示读取多少字节。第一次f.read()会返回文件所有内容，也就是读完了，那么再来一次f.read()就会返回`""`。
- readline()：一次读取一行，下一次调用就会读下一行，常和while一起使用，读完也会返回`""`，注意每行读到的内容末尾是带着`\n`的，所以多次调用print,由于他带着\n再加上print的换行就会换两行。
- readlines()：他会一次读取所有的内容，并由换行符`\n`为分割，将每行的内容放到列表中，然后就能从列表中读取每行的内容了。
写操作（“w”）：也是用open打开文件，如果传入的路径不存在，那么就会创建一个新文件。要注意的是打开文件时，如果原文件存在那么文件内容将被清空。可以使用f.write("aa")来写入内容，但是不会帮你换行，要注意自己加\n。
附加（“a”）：因为w模式会清空重写，所以我们要在后面加内容的话就要使用a模式，传入路径如果没有的话也会创建。
**注意的是：**写操作打开文件时，无法调用read来读文件，很麻烦。这个时候可以传入“r+”参数，进入读写模式，这个时候可以读也可以写，写操作是追加模式。
## 异常捕获
也是防止运行时出现异常导致程序出错，这个时候可以对可能出现异常的代码进行异常捕获。格式如下：
```python
try:
  执行代码1
  执行代码2
  ...
#捕获异常可以写多个except语句，与if elif一样，当捕捉到一个异常之后，后面的捕获就不会运行了。
except 可能异常类型1:
  捕获异常后执行代码
  ...
except 可能异常类型2:
  捕获异常后执行代码
  ...
except 可能异常类型3:
  捕获异常后执行代码
  ...
#如果没有异常发生就会执行else语句
else:
  没有发生异常执行代码
#finally后的代码总会执行，无论是捕捉到异常、没有异常、还是有异常没捕捉到导致程序炸掉都会运行。
finally:
  无论怎样最后都会执行的代码
```
## python测试
主要就是单元测试，测试函数传参和结果是否符合预期。在python中有一个内置的关键字assert（断言），他后边可以加上我们要判断的逻辑表达式，如果为False则会被检测并且会终端运行，后面的代码将不再测试，所以并不高效。为此，我们可以用一个内置库`unittest`，这个库里面有一个TestCase类，我们测试时一般要写一个子类继承这个测试类，然后写一些以test_开头的测试方法调用父类的assertTrue等方法进行判断，父类里面有很多方法能够帮我们进行测试，并且测试出一个问题也不会中断，测试结果较直观。大致如下：
```python
import unittest
#假设有Sentence这个类，是一个句子类
from sentence import Sentence
#创建子类继承unittest.TestCase
class MyTest(unittest.TestCase):
  #setUp是一个前置函数，每一个test_开头的测试函数执行之前都会先执行这个，也可以不写这个函数
  def setUp():
    self.sentence = Sentence("Hello World!")
  def test_len():
    self.assertEquals(self.sentence, 12)
  def test_toUpper():
    self.assertEquals(self.sentence, "HELLO WORLD!")
```
### unittest 常用断言方法汇总表

| 分类 | 断言方法 | 检查逻辑 | 说明 |
| :--- | :--- | :--- | :--- |
| **相等性** | `self.assertEqual(a, b)` | $a == b$ | 检查两个对象的值是否相等 |
| | `self.assertNotEqual(a, b)` | $a \neq b$ | 检查两个对象的值是否不等 |
| **真假值** | `self.assertTrue(x)` | `bool(x) is True` | 检查表达式是否为真 |
| | `self.assertFalse(x)` | `bool(x) is False` | 检查表达式是否为假 |
| **包含关系** | `self.assertIn(a, b)` | $a \in b$ | 检查 $b$ 是否包含 $a$ (字符串、列表、集合等) |
| | `self.assertNotIn(a, b)` | $a \notin b$ | 检查 $b$ 是否不包含 $a$ |
| **空值检查** | `self.assertIsNone(x)` | $x \text{ is None}$ | 检查对象是否为 `None` |
| | `self.assertIsNotNone(x)` | $x \text{ is not None}$ | 检查对象是否不为 `None` |
| **对象身份** | `self.assertIs(a, b)` | $a \text{ is } b$ | 检查两个变量是否指向同一个内存对象 |
| | `self.assertIsNot(a, b)` | $a \text{ is not } b$ | 检查两个变量是否指向不同的对象 |
| **数值比较** | `self.assertAlmostEqual(a, b)` | $round(a-b, 7) == 0$ | 用于浮点数比较，防止精度问题 |
| **类型检查** | `self.assertIsInstance(a, b)` | `isinstance(a, b)` | 检查 $a$ 是否是类 $b$ 的实例 |
其实assertTrue这个方法非常通用，因为逻辑判断表达式一般我们都能写出来，比如`assertTrue(a not in list)和assertNotIn(a,list)`其实是等价的，但是一般不介意全都用assertTrue，一方面是因为明确一点的方法名更准确，另一方面是因为明确一点的方法测试出来的问题描述更准确。
要注意的是，我们写完测试类要用`python -m unittest`命令执行，或者写一个main函数执行
## 高阶函数
类似于java的函数式编程，就是能够将函数作为参数传入一个函数，具体如下：
```python
def calculate(num, calculator):
  print(calculator(num))
def calculate_power_two(num):
  return num ** 2
def calculate_plus_ten(num):
  return num + 10
#注意传入函数的时候不要加括号，加上括号代表调用，只传函数名就行
calculate(10, calculate_power_two)
calculate(10, calculate_plus_ten)

```
## 匿名函数
lambda 毋庸置疑，匿名函数，即用即仍。lambda关键字用来定义匿名函数，格式为`lambda 参数列表（逗号分隔）:返回值`，lambda函数也能直接运行，定义括号起来，后面加括号起来的参数，比如`(lambda num1, num2 : num1 + num2)(2, 3)`,python中的匿名函数一般比较简单，不能定义很复杂的匿名函数
```python
def calculate(num, calculator):
  print(calculator(num))
calculate(20, lambda num : num ** 2)
print((lambda num1, num2 : num1 + num2)(2, 3))
```