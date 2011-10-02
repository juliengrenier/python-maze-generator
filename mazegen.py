from itertools import product
import random
#Aldous-Broden algo
class Mazegen(object):
    def __init__(self,size):
        self.size = size
        self.tree = {}


    def possible_choices(self,node):
        x,y = node
        max=self.size
        moves = []
        if x-1 >= 0 : moves.append((x-1,y))
        if y-1 >= 0 : moves.append((x,y-1))
        if x+1 < max: moves.append((x+1,y))
        if y+1 < max: moves.append((x,y+1))
        return moves

    def pick_a_move(self,node):
        return random.choice(self.possible_choices(node)),node
    
    def is_visited(self,node):
        if node in self.tree:
            return self.tree[node][2]
        else:
            self.tree.update({node:[None,[],False]})
            return False

    def set_parent(self,node,parent):
        if self.tree[node][0]:
            raise Exception('%s Already have a parent %s received %s (%s) ' % (node,self.tree[node][0],parent,self.tree))
        self.tree[node][0] = parent


    def add_child_to_parent(self,node,parent):
        direction = self.move_direction(parent,node)
        if direction in self.tree[parent][1]:
            raise Exception('%s already a child of %s. %s' % (node,parent,self.tree))
        self.tree[parent][1].append(direction)

    def set_visited(self,node):
        if node in self.tree:
            self.tree[node][2] = True
        else:
            self.tree.update({node:[None,[],True]})

    def visit_a_node(self,node,parent):
        if self.is_visited(node):
            return

        self.set_parent(node,parent)
        self.add_child_to_parent(node,parent)
        self.set_visited(node)

    def is_finish(self):
        return not filter(lambda n:not self.is_visited(n), self.tree)

    def generate_maze(self):
        root = (0,0)
        self.set_visited(root)
        current = root
        while not self.is_finish():
           next,current = self.pick_a_move(current)
           if next:
               self.visit_a_node(next,current)
               current = next
        return self.tree


    def get_classes_for_node(self,node):
        classes = self.tree[node][1]
        if self.tree[node][0]:
            classes.append(self.move_direction(node,self.tree[node][0]))
        classes_string = " ".join(classes)
        return classes_string

    def draw_maze(self,filename):
        f = open(filename,mode='w')
        from renderer import render_static_html
        result = render_static_html(self)
        f.write(result.__unicode__())
        f.close()

    def move_direction(self,from_node,to_node):
        x1,y1 = from_node
        x2,y2 = to_node
        if x1 < x2: return 'S'
        if x1 > x2: return 'N'
        if y1 > y2: return 'E'
        if y1 < y2: return 'W'

class RecursiveBacktracker(Mazegen):
    def __init__(self,size):
        super(RecursiveBacktracker,self).__init__(size)
        self.stack = []

    def pick_a_move(self,node):
        choices = filter(lambda c: not self.is_visited(c),self.possible_choices(node))
        if choices:
            self.stack.append(node)
            choice = random.choice(choices)
            return choice,node
        return self.pick_a_move(self.stack.pop())
        
class GrowingTree(Mazegen):
    def __init__(self,size):
        super(GrowingTree,self).__init__(size)
        self.active_sets = set([])

    def pick_a_move(self,node):
        choices = filter(lambda c: not self.is_visited(c),self.possible_choices(node))
        if choices:
            choice = random.choice(choices)
            return choice,node
        self.active_sets.remove(node)
        if self.is_finish():
            return None,None
        type = random.randint(0,2)
        if type == 0:
            return self.pick_a_move(random.choice(list(self.active_sets)))
        if type == 1:
            return self.pick_a_move(list(self.active_sets)[0])
        if type == 2:
            return self.pick_a_move(list(self.active_sets)[-1])


    def set_visited(self,node):
        super(GrowingTree,self).set_visited(node)
        self.active_sets.add(node)

    def is_finish(self):
        return len(self.active_sets) == 0

if __name__ == '__main__':
    from sys import argv,setrecursionlimit
    setrecursionlimit(2000)
    if not len(argv) == 3:
        print "Usage : mazegen [size] [filename]"
        exit(1)
    name,size,filename = argv
    maze_gen = GrowingTree(size=int(size))  
    maze_gen.generate_maze()
    maze_gen.draw_maze(filename=filename)