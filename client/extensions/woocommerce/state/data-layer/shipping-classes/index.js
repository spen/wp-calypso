/** @format */

/**
 * Internal dependencies
 */
import { dispatchRequestEx } from 'state/data-layer/wpcom-http/utils';
import request from 'woocommerce/state/sites/http-request';
import {
	fetchShippingClassesFailure,
	fetchShippingClassesSuccess,
} from 'woocommerce/woocommerce-services/state/shipping-classes/actions';
import { WOOCOMMERCE_SERVICES_SHIPPING_CLASSES_REQUEST } from 'woocommerce/woocommerce-services/state/action-types';
import { verifyResponseHasData } from 'woocommerce/state/data-layer/utils';

export const fetch = action => {
	const { siteId } = action;
	return request( siteId, action ).get( 'products/shipping_classes' );
};

const onError = ( action, error ) => dispatch => {
	dispatch( fetchShippingClassesFailure( action, error ) );
};

const onSuccess = ( { siteId }, { data } ) => dispatch => {
	dispatch( fetchShippingClassesSuccess( siteId, data ) );
};

export default {
	[ WOOCOMMERCE_SERVICES_SHIPPING_CLASSES_REQUEST ]: [
		dispatchRequestEx( {
			fetch,
			onSuccess,
			onError,
			fromApi: verifyResponseHasData,
		} ),
	],
};