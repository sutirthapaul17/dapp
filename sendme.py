import tkinter as tk
from tkinter import filedialog, simpledialog, scrolledtext
import subprocess
import threading
import re
import os

def run_command(command, callback):
    def execute():
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, shell=True)
        output = ""
        for line in iter(process.stdout.readline, ""):
            output += line
            log_text.insert(tk.END, line)
            log_text.see(tk.END)
            app.update_idletasks()
        process.stdout.close()
        process.wait()
        callback(output)
    
    thread = threading.Thread(target=execute)
    thread.start()

def upload_file():
    file_path = filedialog.askopenfilename()
    if file_path:
        log_text.insert(tk.END, f"Uploading: {file_path}\n")
        log_text.see(tk.END)
        run_command(f".\sendme.exe send \"{file_path}\"", extract_key)

def extract_key(log_output):
    match = re.findall(r'\b[A-Fa-f0-9]{286}\b', log_output)
    if match:
        key = match[-1]
        log_text.insert(tk.END, f"Extracted Key: {key}\n")
        log_text.see(tk.END)

def download_file():
    save_location = os.getcwd()
    key = simpledialog.askstring("Enter Key", "Enter the 286-character key:")
    if key and len(key) == 286:
        log_text.insert(tk.END, f"Downloading to: {save_location} using key: {key}\n")
        log_text.see(tk.END)
        run_command(f".\sendme.exe receive {key}", lambda _: None)
    else:
        log_text.insert(tk.END, "Invalid key. Please enter a valid 286-character key.\n")
        log_text.see(tk.END)

app = tk.Tk()
app.title("SendMe File Transfer")
app.geometry("600x400")

tk.Button(app, text="Upload File", command=upload_file, width=20).pack(pady=10)
tk.Button(app, text="Download File", command=download_file, width=20).pack(pady=10)

log_text = scrolledtext.ScrolledText(app, height=15, width=70)
log_text.pack(pady=10)

app.mainloop()
