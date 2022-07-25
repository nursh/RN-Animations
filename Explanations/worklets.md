# Worklets

- animation worklets are executed on the UI Thread
- shaders are executed on the GPU
- Wrap components so that the properties updated on done on the UI Thread not on the JS Thread
- Animating certain properties uses the UI Manager and will affect the layout of other layouts
  - while others don't affect the layout and are updated directly

- Shared values live on the JS Thread and the UI Thread 
  - can be updated from either side