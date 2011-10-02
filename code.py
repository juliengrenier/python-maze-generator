import web

from mazegen import GrowingTree
from renderer import render_html
urls =(
    '/','generate'
)

render = web.template.render('templates/')
from sys import setrecursionlimit
setrecursionlimit(2000)
class generate:
    def generate(self):
        inputs = web.input()
        if 'size' in inputs.keys():
            size = int(inputs.size)
        else:
            size = 15
        maze = GrowingTree(size=size)
        maze.generate_maze()
        return render_html(maze=maze)


    def POST(self):
        return self.generate()

    def GET(self):
        return self.generate()

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.internalerror = web.debugerror
    app.run()