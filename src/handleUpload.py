from pyscript import window, document
from pyodide.ffi.wrappers import add_event_listener

async def handleUpload(event):
  print(event.target.files)
  for file in event.target.files:
      #print(file.name)
      print()
  document.querySelector(".step-1b").innerText= "Folder Uploaded!"
  
      
add_event_listener(document.getElementById("upload"), "change", handleUpload)

