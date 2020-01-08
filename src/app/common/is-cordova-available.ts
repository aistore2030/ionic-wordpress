export let isCordovaAvailable = () => {
	if (!(<any>window).cordova) {
		console.log('This is a native feature. Please use a device');
		return false;
	}
	return true;
};
