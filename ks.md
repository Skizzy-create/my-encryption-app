The *primitives* of the transport layer are basic operations or services provided to applications to facilitate communication between devices in a network. These primitives allow an application to set up, use, and release connections for data transfer. Key transport layer primitives include:

1. *LISTEN*: 
   - Used by a server to wait for an incoming connection from a client.
   - The server remains in a passive state, prepared to accept connection requests.

2. *CONNECT*: 
   - Initiated by the client to establish a connection with a server.
   - The CONNECT primitive triggers the three-way handshake to start a TCP connection.

3. *SEND*: 
   - Used to transmit data from one device to another once a connection is established.
   - SEND primitives ensure data is segmented and transmitted correctly, possibly with flow and error control.

4. *RECEIVE*: 
   - Allows an application to receive incoming data on an established connection.
   - The RECEIVE primitive may involve acknowledging receipt and reordering data segments.

5. *DISCONNECT (or CLOSE)*:
   - Used to terminate an established connection between a client and server.
   - This is typically initiated by one side, and after acknowledgment, the connection is safely closed, freeing resources.

These primitives provide a structured way for the transport layer to handle connection management and data transfer, crucial for reliable communication in protocols like TCP.