// UI Elements
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');
const speedSlider = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedVal');
const senderPackets = document.getElementById('senderPackets');
const receiverPackets = document.getElementById('receiverPackets');
const transmissionLine = document.getElementById('transmissionLine');
const statusLog = document.getElementById('statusLog');

// Statistics elements
const packetsSentEl = document.getElementById('packetsSent');
const packetsDeliveredEl = document.getElementById('packetsDelivered');
const packetsLostEl = document.getElementById('packetsLost');
const acksLostEl = document.getElementById('acksLost');
const retransmissionsEl = document.getElementById('retransmissions');
const efficiencyEl = document.getElementById('efficiency');

// Simulation variables
let simulation = {
  running: false,
  paused: false,
  speed: 1,
  windowSize: 4,
  totalPackets: 12,
  lossRate: 20,
  ackLossRate: 10,
  timeout: 3000,
  base: 0,
  nextSeqNum: 0,
  expectedSeqNum: 0,
  packets: [],
  timers: {},
  messageElements: {},
  stats: {
    packetsSent: 0,
    packetsDelivered: 0,
    packetsLost: 0,
    acksLost: 0,
    retransmissions: 0
  },
  updateStats: function() {
    packetsSentEl.textContent = this.stats.packetsSent;
    packetsDeliveredEl.textContent = this.stats.packetsDelivered;
    packetsLostEl.textContent = this.stats.packetsLost;
    acksLostEl.textContent = this.stats.acksLost;
    retransmissionsEl.textContent = this.stats.retransmissions;
    
    const efficiency = this.stats.packetsSent > 0 
      ? Math.round((this.stats.packetsDelivered / this.stats.packetsSent) * 100) 
      : 0;
    efficiencyEl.textContent = efficiency + '%';
  }
};

// Helper Functions
function log(message) {
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  
  const time = new Date();
  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  
  entry.innerHTML = `<span class="log-time">[${timeStr}]</span> ${message}`;
  statusLog.appendChild(entry);
  statusLog.scrollTop = statusLog.scrollHeight;
}

function getAdjustedTime(time) {
  return time / simulation.speed;
}

function createSenderPacket(seqNum) {
  const packet = document.createElement('div');
  packet.className = 'packet unsent';
  packet.dataset.seqNum = seqNum;
  packet.textContent = seqNum;
  
  simulation.packets[seqNum] = {
    element: packet,
    status: 'unsent',
    sent: false,
    acked: false,
    received: false
  };
  
  senderPackets.appendChild(packet);
  return packet;
}

function createReceiverPacket(seqNum) {
  const packet = document.createElement('div');
  packet.className = 'packet';
  packet.style.visibility = 'hidden';
  packet.dataset.seqNum = seqNum;
  packet.textContent = seqNum;
  receiverPackets.appendChild(packet);
  return packet;
}

function updatePacketStatus(seqNum, status) {
  const packet = simulation.packets[seqNum];
  if (!packet) return;
  
  packet.status = status;
  packet.element.className = `packet ${status}`;
  
  // Update packet properties based on status
  switch(status) {
    case 'sent':
      packet.sent = true;
      break;
    case 'ack':
      packet.acked = true;
      break;
    case 'received':
      packet.received = true;
      break;
  }
}

function createMessage(text, startX, startY, targetX, targetY, duration, color = 'white', backgroundColor = '#2196f3') {
  const message = document.createElement('div');
  message.className = 'message slide-in';
  message.textContent = text;
  message.style.left = startX + 'px';
  message.style.top = startY + 'px';
  message.style.backgroundColor = backgroundColor;
  message.style.color = color;
  
  transmissionLine.appendChild(message);
  
  // Animate movement
  setTimeout(() => {
    message.style.left = targetX + 'px';
    message.style.top = targetY + 'px';
    
    setTimeout(() => {
      message.classList.remove('slide-in');
      message.classList.add('slide-out');
      setTimeout(() => {
        if (message.parentNode) {
          message.parentNode.removeChild(message);
        }
      }, 500);
    }, duration);
  }, 10);
  
  return message;
}

function updateWindowMarker() {
  // Remove existing marker
  const existingMarker = document.querySelector('.window-marker');
  if (existingMarker) {
    existingMarker.parentNode.removeChild(existingMarker);
  }
  
  // Create new marker for vertical layout
  const windowMarker = document.createElement('div');
  windowMarker.className = 'window-marker';
  
  const firstPacket = senderPackets.querySelector(`[data-seq-num="${simulation.base}"]`);
  if (!firstPacket) return;
  
  const packetHeight = firstPacket.offsetHeight;
  const packetMargin = 15; // gap between packets
  const windowHeight = simulation.windowSize * (packetHeight + packetMargin);
  
  windowMarker.style.top = (firstPacket.offsetTop - 5) + 'px';
  windowMarker.style.height = (windowHeight + 5) + 'px';
  
  senderPackets.appendChild(windowMarker);
}

function sendPacket(seqNum) {
  if (!simulation.running || simulation.paused) return;
  
  const packet = simulation.packets[seqNum];
  if (!packet || packet.acked) return;
  
  updatePacketStatus(seqNum, 'sent');
  simulation.stats.packetsSent++;
  
  log(`Sending packet ${seqNum}`);
  
  // Create message animation for vertical layout
  const senderPacket = packet.element;
  const rect = senderPacket.getBoundingClientRect();
  const containerRect = transmissionLine.getBoundingClientRect();
  
  // For vertical layout, we're animating horizontally
  const startY = rect.top + (rect.height / 2) - containerRect.top;
  const startX = 0; // Start from left (sender)
  
  // Determine if packet is lost
  const isLost = Math.random() * 100 < simulation.lossRate;
  
  if (isLost) {
    simulation.stats.packetsLost++;
    log(`Packet ${seqNum} lost in transmission`);
    
    // Show packet as lost in the middle of transmission line
    const lostMessage = createMessage(`Packet ${seqNum} lost`, startX, startY, containerRect.width / 2, startY, getAdjustedTime(1000), 'white', 'orangered');
    simulation.messageElements[`lost-${seqNum}`] = lostMessage;
  } else {
    // Send packet to receiver (animate from left to right)
    const message = createMessage(`Packet ${seqNum}`, startX, startY, containerRect.width, startY, getAdjustedTime(1500));
    simulation.messageElements[`packet-${seqNum}`] = message;
    
    // Schedule packet to arrive
    setTimeout(() => {
      if (!simulation.running || simulation.paused) return;
      
      // Mark packet as received
      const receiverPacket = receiverPackets.querySelector(`[data-seq-num="${seqNum}"]`);
      if (receiverPacket) {
        receiverPacket.className = 'packet received';
        receiverPacket.style.visibility = 'visible';
      }
      
      log(`Packet ${seqNum} received by receiver`);
      
      // Send ACK
      sendAck(seqNum);
    }, getAdjustedTime(1500));
  }
  
  // Set timeout for this packet
  simulation.timers[seqNum] = setTimeout(() => {
    if (!simulation.running || simulation.paused) return;
    
    const packet = simulation.packets[seqNum];
    if (packet && !packet.acked) {
      updatePacketStatus(seqNum, 'timeout');
      log(`Timeout for packet ${seqNum}, retransmitting`);
      
      // Retransmit packet
      simulation.stats.retransmissions++;
      setTimeout(() => {
        if (!simulation.running || simulation.paused) return;
        sendPacket(seqNum);
      }, getAdjustedTime(500));
    }
  }, getAdjustedTime(simulation.timeout));
}

function sendAck(seqNum) {
  if (!simulation.running || simulation.paused) return;
  
  // Determine if ACK is lost
  const isLost = Math.random() * 100 < simulation.ackLossRate;
  
  const receiverPacket = receiverPackets.querySelector(`[data-seq-num="${seqNum}"]`);
  if (!receiverPacket) return;
  
  const rect = receiverPacket.getBoundingClientRect();
  const containerRect = transmissionLine.getBoundingClientRect();
  
  // For vertical layout, we're animating horizontally
  const startY = rect.top + (rect.height / 2) - containerRect.top;
  const startX = containerRect.width; // Start from right (receiver)
  
  if (isLost) {
    simulation.stats.acksLost++;
    log(`ACK ${seqNum} lost in transmission`);
    
    // Show ACK as lost in the middle of transmission line
    const lostAckMessage = createMessage(`ACK ${seqNum} lost`, startX, startY, containerRect.width / 2, startY, getAdjustedTime(1000), 'white', 'orangered');
    simulation.messageElements[`lost-ack-${seqNum}`] = lostAckMessage;
  } else {
    // Send ACK to sender (animate from right to left)
    const ackMessage = createMessage(`ACK ${seqNum}`, startX, startY, 0, startY, getAdjustedTime(1500), 'black', 'limegreen');
    simulation.messageElements[`ack-${seqNum}`] = ackMessage;
    
    // Schedule ACK to arrive
    setTimeout(() => {
      if (!simulation.running || simulation.paused) return;
      
      // Mark packet as acknowledged
      updatePacketStatus(seqNum, 'ack');
      log(`ACK ${seqNum} received by sender`);
      
      // Clear the timeout for this packet
      if (simulation.timers[seqNum]) {
        clearTimeout(simulation.timers[seqNum]);
        delete simulation.timers[seqNum];
      }
      
      simulation.stats.packetsDelivered++;
      
      // If this is the base packet, advance the window
      if (seqNum === simulation.base) {
        let nextBase = simulation.base + 1;
        
        // Find the next unacknowledged packet
        while (simulation.packets[nextBase] && simulation.packets[nextBase].acked && nextBase < simulation.totalPackets) {
          nextBase++;
        }
        
        if (nextBase !== simulation.base) {
          simulation.base = nextBase;
          log(`Window base advanced to ${simulation.base}`);
          updateWindowMarker();
          
          // Send more packets if possible
          trySendingNextPackets();
        }
      }
      
      // Update statistics
      simulation.updateStats();
    }, getAdjustedTime(1500));
  }
}

function trySendingNextPackets() {
  if (!simulation.running || simulation.paused) return;
  
  while (simulation.nextSeqNum < simulation.base + simulation.windowSize && 
         simulation.nextSeqNum < simulation.totalPackets) {
    sendPacket(simulation.nextSeqNum++);
  }
  
  // If all packets have been acknowledged, end simulation
  let allAcked = true;
  for (let i = 0; i < simulation.totalPackets; i++) {
    if (!simulation.packets[i] || !simulation.packets[i].acked) {
      allAcked = false;
      break;
    }
  }
  
  if (allAcked) {
    log('All packets successfully transmitted and acknowledged');
    simulation.running = false;
    startBtn.textContent = 'RESTART SIMULATION';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
  }
}

function startSimulation() {
  // Reset everything
  resetSimulation();
  
  // Get configuration
  simulation.windowSize = parseInt(document.getElementById('windowSize').value);
  simulation.totalPackets = parseInt(document.getElementById('totalPackets').value);
  simulation.lossRate = parseInt(document.getElementById('lossRate').value);
  simulation.ackLossRate = parseInt(document.getElementById('ackLossRate').value);
  simulation.timeout = parseInt(document.getElementById('timeout').value);
  simulation.speed = parseFloat(speedSlider.value);
  
  // Create packets
  for (let i = 0; i < simulation.totalPackets; i++) {
    createSenderPacket(i);
    createReceiverPacket(i);
  }
  
  // Mark running
  simulation.running = true;
  simulation.paused = false;
  
  // Update UI
  startBtn.textContent = 'RESTART SIMULATION';
  pauseBtn.style.display = 'inline-block';
  resumeBtn.style.display = 'none';
  
  // Show window
  updateWindowMarker();
  
  // Log start
  log('Simulation started');
  
  // Start sending packets
  trySendingNextPackets();
}

function pauseSimulation() {
  if (!simulation.running) return;
  
  simulation.paused = true;
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'inline-block';
  
  log('Simulation paused');
}

function resumeSimulation() {
  if (!simulation.running) return;
  
  simulation.paused = false;
  pauseBtn.style.display = 'inline-block';
  resumeBtn.style.display = 'none';
  
  log('Simulation resumed');
  
  // Continue with any pending operations
  trySendingNextPackets();
}

function resetSimulation() {
  // Clear timers
  for (const seqNum in simulation.timers) {
    clearTimeout(simulation.timers[seqNum]);
  }
  
  // Reset simulation state
  simulation.running = false;
  simulation.paused = false;
  simulation.base = 0;
  simulation.nextSeqNum = 0;
  simulation.expectedSeqNum = 0;
  simulation.packets = [];
  simulation.timers = {};
  simulation.messageElements = {};
  simulation.stats = {
    packetsSent: 0,
    packetsDelivered: 0,
    packetsLost: 0,
    acksLost: 0,
    retransmissions: 0
  };
  
  // Update statistics
  simulation.updateStats();
  
  // Clear UI
  senderPackets.innerHTML = '';
  receiverPackets.innerHTML = '';
  transmissionLine.innerHTML = '';
  
  // Reset buttons
  startBtn.textContent = 'START SIMULATION';
  pauseBtn.style.display = 'inline-block';
  resumeBtn.style.display = 'none';
  
  log('Simulation reset');
}

// Event listeners
startBtn.addEventListener('click', startSimulation);
pauseBtn.addEventListener('click', pauseSimulation);
resumeBtn.addEventListener('click', resumeSimulation);
resetBtn.addEventListener('click', resetSimulation);

speedSlider.addEventListener('input', () => {
  speedVal.textContent = speedSlider.value + 'x';
  simulation.speed = parseFloat(speedSlider.value);
});

// Initialize the simulation area
resetSimulation();