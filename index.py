import tkinter as tk
from tkinter import *
import datetime

global selected_stock
global selected_unit
def calculate():
    while True:
        #ask for film formt
        print("choose a film format")
        print(stock())
        
        #ask for frame rate
        print("Frame rate: ")
        fps = input()
        print (fps, "fps")

        #

        #asking for length of film and unit of measurement
        print(length(), units())
        
        #calculation? not a correct formula
        len = (length()(fps * 60) / frames)

        #converting decimal to seconds
        timedelta = datetime.timedelta(seconds=len)
        seconds = timedelta.total_seconds()
        time = datetime.time(seconds=seconds)

        #printing out the current time of the film
        print(time)


def stock():
    try: 
        root = tk.Tk()
        # variable to store the selected value
        global selected_stock 
        selected_stock = tk.StringVar()
        # list of options

        #Add a label to the widget
        label = tk.Label(root, text="Select an Option:")

        global format
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
        option_menu = tk.OptionMenu(root, selected_stock, *format)

        #Pack the widget and label
        option_menu.pack()
        label.pack()

        #start the main loop
        root.mainloop()
        return selected_stock
    except ValueError: 
        print("choose a film stock")


def units():
    try:
        #create global variable to calculate frames per feet
        global fpf
        #create global variable to calculate frames per meter
        global fpm
        root = tk.Tk()
        # Create a variable to store the selected unit
        global selected_unit 
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
                
        return selected_unit
    except ValueError:
        print("choose a unit")

def frames():
    if (units=="feet" or units=="inches" or units=="feet and inches"):
        if (format == "8mm"):
            fpf = 80
        elif(format == "Super 8"):
            fpf = 72
        elif(format == "16mm"):
            fpf = 40
        elif(format == "35 2perf"):
            fpf = 32
        elif(format =="35 3perf"):
            fpf = 21.33
        elif(format=="35 4perf"):
            fpf = 16
        elif(format=="65 5perf"):
            fpf = 12.8
    elif(units=="meters" or units =="centimeters" or units=="meters and centimeters"):
        if (format == "8mm"):
            fpm = 264
        elif(format == "Super 8"):
            fpm = 236.21
        elif(format == "16mm"):
            fpm = 131.23
        elif(format == "35 2perf"):
            fpm = 105
        elif(format =="35 3perf"):
            fpm = 70
        elif(format=="35 4perf"):
            fpm = 52.5
        elif(format=="65 5perf"):
            fpm = 42



def length():
    if units() == "feet":
        print(input())
    elif units() == "meters":
        print(input(), " m")
    elif units() == "inches":
        print(input(), " in")
    elif units() == "centimeters":
        print(input(), " cm")
    elif units() == "feet and inches":
        print(input(), " '", input(), " in")
    elif units() == "meters and centimeters":
        print(input(), " m ", input(), " cm")


calculate()





#under film type, add how many frames per foot
#8mm = 80fpf    Super 8 = 72 fpf    16mm = 40fpf    35 2perf = 32 fpf    35 3perf = 21.33 fpf   35 4perf = 16fpf    65 5perf = 12.8fpf
#8mm = 264fpm    Super 8 = 236.21 fpm    16mm = 131.23fpm    35 2perf = 105fpm    35 3perf = 70fpm   35 4perf = 52.5fpm    65 5perf = 42fpm


#calculation
#film length = run time ((fps * 60) / (frames per foot or meter))




#Steps: 

#ask for film format
#ask for frame rate
# *User needs to give film length, frames, or run-time to get any remaining values.*
#based on those three selections, perform the calculation
#once calculation is complete, output remiaining film left. The user can choose to add this take to current project. 
#the remaining film will be used for the next calculation and so on. 
