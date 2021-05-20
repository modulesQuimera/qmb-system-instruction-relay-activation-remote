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
                        { name: "source_value", value: parseInt(node.source_value) },
                        { name: "edge_open", value: node.edge_open === "true" ? true : false },
                        { name: "edge_close", value: node.edge_close === "true" ? true : false }
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