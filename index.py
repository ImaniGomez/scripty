from tkinter import *
def calculate(selected_stock, selected_unit):
    while True:
        print("choose a film format")
        print(stock())
        
        print("Frame rate: ")
        fps = input()
        print (fps, "fps")

        print(length(), units())
        

        print (length() / fps)



def stock():
    try: 
        root = tk.Tk()
        # variable to store the selected value
        selected_stock = tk.StringVar()
        # list of options
        format = [
            "8mm",
            "Super 8",
            "16mm",
            "35mm 2perf",
            "35mm 3perf",
            "35mm 4perf",
            "65mm 5perf",
        ]
        # OptionMenu widget
        option_menu = tk.OptionMenu(root, selectedstock, *options)

        #Add a label to the widget
        label = tk.Label(root, text="Select and Option:")

        #Pack the widget and label
        option_menu.pack()
        label.pack()

        #start the main loop
        root.mainloop()
    except ValueError: 
        print("choose a film stock")

def units():
    root = tk.Tk()
    # Create a variable to store the selected unit
    selected_unit = tk.StringVar()
    # Create a list of units
    units = ["feet", "meters", "inches", "centimeters", "feet and inches", "meters and centimeters"]
    # Create a drop down menu
    drop_down_menu = tk.OptionMenu(root, selected_unit, *units)
    # Add a label to the widget
    label = tk.Label(root, text="Select a unit:")
    # Pack the widget and label
    drop_down_menu.pack()
    label.pack()
    # Start the main loop
    root.mainloop()

def length():
    if selected_unit == "feet":
        print(input())
    elif selected_unit == "meters":
        print(input(), " m")
    elif selected_unit == "inches":
        print(input(), " in")
    elif selected_unit == "centimeters":
        print(input(), " cm")
    elif selected_unit == "feet and inches":
        print(input(), " '", input(), " in")
    elif selected_unit == "meters and centimeters":
        print(input(), " m ", input(), " cm")

        






#under film type, add how many frames per foot
#8mm = 80fpf    Super 8 = 72 fpf    16mm = 40fpf    35 2perf = 32 fpf    35 3perf = 21.33 fpf   35 4perf = 16fpf    65 5perf = 12.8fpf
#8mm = 264fpm    Super 8 = 236.21 fpm    16mm = 131.23fpm    35 2perf = 105fpm    35 3perf = 70fpm   35 4perf = 52.5fpm    65 5perf = 42fpm


#calculation
#film length = run time ((fps * 60) / (frames per foot or meter))