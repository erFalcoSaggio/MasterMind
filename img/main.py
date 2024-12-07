import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk

def click(event):
    # Quando clicchi sull'immagine, ottieni le coordinate
    x, y = event.x, event.y
    print(f"Coordinata rilevata: X={x}, Y={y}")
    coords.append((x, y))

def salva_coordinate():
    # Salva le coordinate in un file di testo
    with open("coordinate.txt", "w") as file:
        for x, y in coords:
            file.write(f"{x},{y}\n")
    print("Coordinate salvate in 'coordinate.txt'!")

# Inizializza finestra Tkinter
root = tk.Tk()
root.title("Rileva Coordinate dei Cerchi")

# Chiedi all'utente di selezionare un'immagine
file_path = filedialog.askopenfilename(title="Seleziona un'immagine")
if not file_path:
    print("Nessuna immagine selezionata. Esci.")
    exit()

# Carica l'immagine selezionata
img = Image.open(file_path)
img_tk = ImageTk.PhotoImage(img)

# Mostra l'immagine in una finestra
label = tk.Label(root, image=img_tk)
label.pack()

# Lista per memorizzare le coordinate
coords = []

# Associa il click del mouse alla funzione
label.bind("<Button-1>", click)

# Bottone per salvare le coordinate
button = tk.Button(root, text="Salva Coordinate", command=salva_coordinate)
button.pack()

# Avvia l'interfaccia grafica
root.mainloop()
