
class TreeNode(object):
    rightChild = None
    leftChild = None
    parent = None

    def __init__(self, key, val):
        self.key = key
        self.val = val

    def hasRightChild(self):
        return self.rightChild is not None

    def hasLeftChild(self):
        return self.leftChild is not None

    def hasParent(self):
        return self.parent is not None

    def setRightChild(self, node):
        self.rightChild = node

    def setLeftChild(self, node):
        self.leftChild = node

    def setParent(self, node):
        self.parent = node
