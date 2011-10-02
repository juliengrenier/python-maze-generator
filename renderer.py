# -*- coding: utf-8 -*-
import web
import settings
render = web.template.render(settings.TEMPLATE_FOLDER,globals={'settings':settings})

def render_live_html(maze):
    return render.maze(maze.size,maze,playable=True)

def render_static_html(maze):
    return render.maze(maze.size,maze,playable=False)