import trimesh
import numpy as np

# Create an iceberg mesh by building a height map
# Or simpler: create an icosphere, scale Z, then cut it and shape it.

# Let's create a custom mesh with explicit vertices for a classic iceberg shape
# Top part (peak)
v_top = [0, 0, 5]
# Water level hexagon
angles = np.linspace(0, 2*np.pi, 7)[:-1]
r_water = 3
v_water = [[r_water * np.cos(a), r_water * np.sin(a), 0] for a in angles]
# Mid underwater part (wider)
r_mid = 5
v_mid = [[r_mid * np.cos(a + 0.3), r_mid * np.sin(a + 0.3), -4] for a in angles]
# Bottom part
v_bottom = [0, 0, -10]

vertices = [v_top] + v_water + v_mid + [v_bottom]
vertices = np.array(vertices)

# Faces
faces = []
# Top cap
for i in range(1, 7):
    nxt = i + 1 if i < 6 else 1
    faces.append([0, i, nxt])
    
# Side top-mid
for i in range(1, 7):
    nxt = i + 1 if i < 6 else 1
    mid_idx = i + 6
    mid_nxt = nxt + 6
    faces.append([i, mid_idx, nxt])
    faces.append([nxt, mid_idx, mid_nxt])

# Bottom cap
for i in range(7, 13):
    nxt = i + 1 if i < 12 else 7
    faces.append([i, 13, nxt])

# Let's subdivide it to make it look a bit more complex but still low poly
mesh = trimesh.Trimesh(vertices=vertices, faces=faces)
mesh = mesh.subdivide()
mesh = mesh.subdivide()

# Add some noise to make it jagged
noise = np.random.normal(0, 0.4, mesh.vertices.shape)
# Don't move the top and bottom too much horizontally
noise[:, 0] *= 0.5
noise[:, 1] *= 0.5
mesh.vertices += noise

# Color it: above water is white, below is blue
colors = []
for v in mesh.vertices:
    if v[2] >= -0.5:
        colors.append([240, 248, 255, 255]) # Alice blue
    else:
        colors.append([135, 206, 250, 255]) # Light sky blue
mesh.visual.vertex_colors = colors

# Add a water plane for effect
r_plane = 15
v_plane = [[r_plane * np.cos(a), r_plane * np.sin(a), 0] for a in angles]
f_plane = []
for i in range(1, 5):
    f_plane.append([0, i, i+1])
plane = trimesh.Trimesh(vertices=[[0,0,0]] + v_plane, faces=[[0, i, i+1 if i<6 else 1] for i in range(1,7)])
plane = plane.subdivide().subdivide()
plane.visual.vertex_colors = [0, 105, 148, 150] # Deep blue, transparent

scene = trimesh.Scene([mesh, plane])
scene.export('iceberg.glb')
