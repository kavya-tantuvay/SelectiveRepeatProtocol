# Selective Repeat Protocol Visualization

# Group Number : 3 (Topic 1)

# Group Members : 
- Nidhi Walke (2023BCS041)
- Kavya Tantuvay (2023BCS032)
- Mudadla Maheswari (2023BCS037)
- Ansita Singh (2023BCS075)

An interactive web-based visualization of the Selective Repeat ARQ Protocol, demonstrating how this reliable data transfer protocol works in computer networks.

## 📋 About The Project

This project provides an educational visualization of the Selective Repeat Protocol, allowing users to observe and interact with the protocol's key mechanisms:

- Sliding window flow control
- Selective packet acknowledgment
- Timeout and retransmission handling
- Packet loss recovery

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- JavaScript enabled in your browser

### Installation & Running the Project

#### Method 1: Using VS Code Live Server

1. Open this folder (SelectiveRepeatProtocol) in Visual Studio Code
2. Install the Live Server extension if you haven't already:
   - Go to Extensions (or press Ctrl+Shift+X)
   - Search for "Live Server"
   - Click "Install" on the extension by Ritwick Dey

3. Launch with Live Server:
   - Right-click on msr.html
   - Select "Open with Live Server"
   - The project will open in your default browser at http://127.0.0.1:5500/msr.html (or similar port)

#### Method 2: GitHub

You can access the project directly from GitHub:
- Visit our GitHub repository: [SelectiveRepeatProtocol](https://github.com/kavya-tantuvay/SelectiveRepeatProtocol)
- Clone the repository using:
```bash
git clone https://github.com/kavya-tantuvay/SelectiveRepeatProtocol.git
```
- Open the downloaded folder and access msr.html in your browser

## 💻 Using the Simulation

### Configure parameters:

- **Window Size**: Number of unacknowledged packets allowed (1-8)
- **Total Packets**: Number of packets to transmit (1-30)
- **Packet Loss Rate**: Probability of packet loss (0-100%)
- **ACK Loss Rate**: Probability of acknowledgment loss (0-100%)
- **Timeout**: Duration before retransmission (500-10000ms)

### Control the simulation:

- Click **START SIMULATION** to begin
- Use **PAUSE/RESUME** to control the flow
- Use **RESET** to start over
- Adjust the speed slider to speed up or slow down the simulation

### Observe the protocol in action:

- Watch packets move between sender and receiver
- See how lost packets are retransmitted
- Observe the sliding window mechanism
- Review statistics and the event log

## 🎯 Understanding the Visualization

### Visual Components

- **Sender Area**: Shows all packets and the current sliding window
- **Transmission Line**: Displays packets and acknowledgments in transit
- **Receiver Area**: Shows successfully received packets
- **Statistics Panel**: Displays performance metrics
- **Status Log**: Provides a detailed timeline of events

### Packet Status Color Code

| Color | Status | Description |
|-------|--------|-------------|
| Gray | Unsent | Packet waiting to be transmitted |
| Gold | Sent | Packet in transmission |
| Green | Acknowledged | Successfully delivered and acknowledged |
| Crimson | Timeout | Packet timed out, awaiting retransmission |
| OrangeRed | Lost | Packet lost during transmission |
| Blue | Received | Packet received by receiver |
| Orange | Retransmitted | Packet retransmitted after packet or ack is lost |


## 💡 Educational Value

This visualization helps users understand:

- How sliding window protocols improve network efficiency
- The mechanism of selective retransmission
- Effects of packet loss on protocol performance
- The importance of proper timeout configuration

## ❓ Troubleshooting

- **Nothing appears**: Verify JavaScript is enabled in your browser
- **Slow animations**: Try reducing window size or total packets
- **Page doesn't load**: Check that all files are in the same directory

## 📄 Files Included

- `msr.html` - Main HTML structure
- `msr.css` - Styles for the visualization
- `msr.js` - JavaScript implementation of the protocol

## 📝 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- Kavya Tantuvay - kavyatantuvay@gmail.com
- Mudadla Maheswari - maheswarimudadla756@gmail.com
- Nidhi Walke - nidhiwalke26@gmail.com
- Ansita Singh - ansita6050@gmail.com

Project Link: https://github.com/kavya-tantuvay/SelectiveRepeatProtocol

[Watch Demo Video](https://github.com/kavya-tantuvay/SelectiveRepeatProtocol/raw/main/view_sr.mp4)
---

This project was developed as an educational tool for visualizing and understanding network protocols.
