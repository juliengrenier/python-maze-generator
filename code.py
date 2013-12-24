import web

from mazegen import GrowingTree
from renderer import render_live_html
urls =(
    '/','generate'
)

from sys import setrecursionlimit
setrecursionlimit(2000)
class generate:
    def generate(self):
        inputs = web.input()
        if 'size' in inputs.keys():
            size = min(44, int(inputs.size))
        else:
            size = 15
        maze = GrowingTree(size=size)
        maze.generate_maze()
        return render_live_html(maze=maze)


    def POST(self):
        return self.generate()

    def GET(self):
        return self.generate()

application = web.application(urls,globals())

if __name__ == '__main__':
    application.internalerror = web.debugerror
    application.run()
