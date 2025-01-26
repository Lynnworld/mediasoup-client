import { RtpCapabilities } from '../../RtpParameters';

/**
 * This function adds RTCP NACK support for OPUS codec in given capabilities.
 */
export function addNackSupportForOpus(rtpCapabilities: RtpCapabilities): void {
	for (const codec of rtpCapabilities.codecs ?? []) {
		if (
			(codec.mimeType.toLowerCase() === 'audio/opus' ||
				codec.mimeType.toLowerCase() === 'audio/multiopus') &&
			!codec.rtcpFeedback?.some(fb => fb.type === 'nack' && !fb.parameter)
		) {
			if (!codec.rtcpFeedback) {
				codec.rtcpFeedback = [];
			}

			codec.rtcpFeedback.push({ type: 'nack' });
		}
	}
}

/**
 * This function adds Dependency Descriptor RTP Header Extension support in given capabilities.
 */
export function addDependencyDescriptorExtension(rtpCapabilities: RtpCapabilities): void {
	const idMapping = new Map<number, boolean>();
	for (const ext of rtpCapabilities.headerExtensions ?? []) {
		if (ext.uri === 'https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension') {
			return;
		}
		idMapping.set(ext.preferredId, true);
	}
	// for (let i = 1; i < 15; i++) {
	// 	if (!idMapping.has(i)) {
	// 		rtpCapabilities.headerExtensions?.push({
	// 			kind: 'video',
	// 			uri: 'https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension',
	// 			preferredId: i,
	// 		});
	// 		return;
	// 	}
	// }
	// temp fix
	rtpCapabilities.headerExtensions?.push({
		kind: 'video',
		uri: 'https://aomediacodec.github.io/av1-rtp-spec/#dependency-descriptor-rtp-header-extension',
		preferredId: 12,
	});
}