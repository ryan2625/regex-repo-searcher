from pyscript import window, document
from pyodide.ffi.wrappers import add_event_listener

async def handleUpload(event):
  ele = document.querySelector(".bridge2")
  ele.classList.add("bridge2a")
  print(event.target.files)
  for file in event.target.files:
       print(file.name)
  document.querySelector(".step-1b").innerText= "Folder Uploaded!"
  
      
add_event_listener(document.getElementById("trigger"), "change", handleUpload)

