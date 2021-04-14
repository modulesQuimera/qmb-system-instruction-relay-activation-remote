module.exports = function(RED) {

	function relay_activation_remoteNode(config) {
		RED.nodes.createNode(this,config);
		this.source_value = config.source_value;
        this.edge_open = config.edge_open;
        this.edge_close = config.edge_close;

		var node = this;
		
		node.on('input', function(msg) {
			var globalContext = node.context().global;
            var file = globalContext.get("exportFile");

            var command = {
                action: "relay_activation_remote",
                payload: {
                    attributes: [
                        { source_value:  parseInt(node.source_value) },
                        { edge_open: node.edge_open === "true" ? true : false },
                        { edge_close: node.edge_close === "true" ? true : false }
                    ],
                }
            };
       
            file.instructions.push(command);
            
			globalContext.set("exportFile", file);
			node.send(msg);
		});
	}
	RED.nodes.registerType("relay_activation_remote", relay_activation_remoteNode);
}