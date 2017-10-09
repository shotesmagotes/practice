
class Heap(object):
    '''
    Heap data structure implemented using a python list
    '''

    def __init__(self):
        self.data = [0]
        self.count = 0

    def add(self, item):
        self.data.append(item)
        self.percUp(self.count)
        self.count += 1

    def delete(self, item):
        self.data[1] = self.data[self.count]
        self.percDown(1)
        self.count -= 1

    def percUp(self, ind):
        parentInd = ind // 2
        
        if parentInd == 0:
            return

        compared = self.compare(self.data[parentInd], self.data[ind])

        if compared > 0:
            tmp = self.data[parentInd]
            self.data[parentInd], self.data[ind] = self.data[ind], tmp # swap
            self.percUp(parendInd)
        
    def percDown(self, ind):
        childInd = ind * 2
        
        compared = self.compare(self.data[childInd], self.data[ind])
        
        if childInd > self.count:
            return

        # check left child
        if compared < 0:
            tmp = self.data[childInd]
            self.data[childInd], self.data[ind] = self.data[ind], tmp
            self.percDown(childInd)
            return

        # check right child
        if childInd + 1 > self.count:
            return

        compared = self.compare(self.data[childInd + 1], self.data[ind])
        
        if compared < 0:
            tmp = self.data[childInd + 1]
            self.data[ind], self.data[childInd + 1] = tmp, self.data[ind]
            self.percDown(childInd + 1)
            return

    def compare(self, A, B):
        '''
        Compare returns one of {-1, 0, 1}
        depending on the relation A and B.
        If you return -1, then it results in A
            getting placed below B in the resulting heap
        If you return 1, then it results in A
            getting placed higher in the resulting heap 
        '''
        if A > B:
            return -1
        elif A < B:
            return 1
        else
            return 0
