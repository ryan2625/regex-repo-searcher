from pyscript import window, document
from pyodide.ffi.wrappers import add_event_listener

async def handleUpload(event):
  print(event.target.files)
  for file in event.target.files:
      print(file.name)
      
add_event_listener(document.getElementById("upload"), "change", handleUpload)

