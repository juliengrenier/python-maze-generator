# -*- coding: utf-8 -*-
import web
render = web.template.render('templates/')

def render_html(maze):
    return render.maze(maze.size,maze)