# -*- coding: utf-8 -*-
import web
render = web.template.render('templates/')

def render_live_html(maze):
    return render.maze(maze.size,maze,playable=True)

def render_static_html(maze):
    return render.maze(maze.size,maze,playable=False)