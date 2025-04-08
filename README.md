🌐 Selective Repeat Protocol Visualization
📋 Overview
This interactive visualization demonstrates the Selective Repeat ARQ Protocol, a fundamental reliable data transfer protocol used in computer networks. Experience how packets are transmitted, acknowledged, lost, and retransmitted in a controlled environment.

✨ Features

📊 Real-time visualization of the Selective Repeat protocol in action
🎛️ Configurable parameters (window size, packet count, loss rates)
⏱️ Adjustable simulation speed for detailed or accelerated viewing
📈 Live statistics tracking efficiency and performance metrics
📝 Detailed event logging for protocol behavior analysis


🚀 Quick Start Guide
System Requirements

Any modern web browser (Chrome, Firefox, Edge, Safari)
JavaScript enabled

Installation in 3 Easy Steps

Download all three project files:
Copymsr.html   - Main HTML structure
msr.css    - Visualization styling
msr.js     - Protocol implementation

Save all files in the same directory/folder
Open msr.html in your web browser

Simply double-click the file or drag it into your browser



That's it! No server setup, compilation, or additional libraries required.

🎮 Using the Simulation
Configuration Panel
ParameterDescriptionRangeWindow SizeNumber of unacknowledged packets allowed in transit1-8Total PacketsTotal number of packets to transmit1-30Packet Loss RateProbability of packet loss during transmission0-100%ACK Loss RateProbability of acknowledgment loss0-100%TimeoutDuration before packet retransmission500-10000ms
Control Buttons

▶️ START SIMULATION: Begin with current parameters
⏸️ PAUSE: Temporarily halt the simulation
▶️ RESUME: Continue a paused simulation
🔄 RESET: Clear all data and return to initial state

Speed Control
Use the slider to adjust simulation speed from 0.5× (slower) to 2× (faster)

🎯 Understanding the Visualization
Visual Components


Sender Area

Displays all packets with their current status
Shows the current sliding window (blue dashed border)


Transmission Line

Animates packets and acknowledgments in transit
Shows packet loss and ACK loss events


Receiver Area

Displays successfully received packets



Packet Color Legend
ColorStatusDescriptionShow Image GrayUnsentPacket waiting to be transmittedShow Image GoldSentPacket in transmissionShow Image GreenAcknowledgedSuccessfully delivered and acknowledgedShow Image CrimsonTimeoutPacket timed out, awaiting retransmissionShow Image OrangeRedLostPacket lost during transmissionShow Image BlueReceivedPacket received by receiver
Statistics Panel

Packets Sent: Total packets transmitted (including retransmissions)
Packets Successfully Delivered: Packets that reached the receiver
Packets Lost: Packets that failed to reach the receiver
ACKs Lost: Acknowledgments that failed to reach the sender
Retransmissions: Number of packet retransmissions
Efficiency: Ratio of successful deliveries to total transmissions

Status Log
Provides a detailed timeline of events during the simulation, including:

Packet transmissions
Packet losses
Acknowledgment transmissions
Acknowledgment losses
Timeouts and retransmissions
Window advancements


💡 Learning Opportunities

Observe how the sliding window mechanism improves throughput
Learn how selective retransmission enhances efficiency
Understand the relationship between window size, timeout values, and protocol performance
Experiment with different loss rates to see impact on throughput
Analyze efficiency metrics under various network conditions


❓ Troubleshooting
IssueSolutionVisualization doesn't appear• Ensure JavaScript is enabled<br>• Verify all three files are in the same directory<br>• Try a different browserSluggish animations• Reduce window size and total packet count<br>• Lower the simulation speed<br>• Close other resource-intensive applicationsUnexpected behavior• Click RESET and restart the simulation<br>• Refresh the browser page<br>• Clear browser cache

🔍 Example Workflow

Set Window Size to 4
Set Total Packets to 12
Set Packet Loss Rate to 20%
Set ACK Loss Rate to 10%
Set Timeout to 3000ms
Click START SIMULATION
Observe the protocol in action:

Watch packets move through the transmission line
Notice lost packets (red) and their retransmissions
See the window advance as packets are acknowledged


Review the statistics and efficiency metrics
Experiment with different parameters to see their effects


📝 Educational Context
This visualization is ideal for:

Students learning computer networking concepts
Educators teaching reliable data transfer protocols
Networking professionals refreshing their understanding
Anyone curious about how internet protocols ensure reliability


📞 Support
For questions or issues regarding this simulation, please contact your course instructor or refer to computer networking textbooks for additional information on the Selective Repeat Protocol.

This project was developed as an educational tool for visualizing and understanding network protocols.
