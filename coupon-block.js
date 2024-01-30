(function () {
    const { registerBlockType } = wp.blocks;
    const { RichText } = wp.editor;
    const { createElement, useState } = wp.element;

    // Coupon Store Block
    registerBlockType('coupon-block/coupon-store', {
        title: 'Coupon Store',
        icon: 'cart',
        category: 'common',
        attributes: {
            coupons: {
                type: 'array',
                default: [
                    { title: '50% Off on Paints', description: 'Get 50% off on all paints. Limited time offer.' },
                    { title: 'Free Shipping on Orders Over $50', description: 'Enjoy free shipping on orders over $50. Use code: FREESHIP.' }
                    // Add more default coupons as needed
                ],
            },
        },
        edit: function (props) {
            const { attributes, setAttributes } = props;

            const handleCouponChange = (index, field, value) => {
                const updatedCoupons = [...attributes.coupons];
                updatedCoupons[index][field] = value;
                setAttributes({ coupons: updatedCoupons });
            };

            const handleAddCoupon = () => {
                const updatedCoupons = [...attributes.coupons, { title: '', description: '' }];
                setAttributes({ coupons: updatedCoupons });
            };

            const handleRemoveCoupon = (index) => {
                const updatedCoupons = [...attributes.coupons];
                updatedCoupons.splice(index, 1);
                setAttributes({ coupons: updatedCoupons });
            };

            return (
                createElement('div', { id: 'content' },
                    createElement('div', { id: 'store-detail' },
                        createElement('div', { className: 'single-store-header' },
                            createElement('div', { className: 'header-store-thumb' },
                                createElement('img', { width: '200', height: '115', src: 'http://127.0.0.1/coupon/wp-content/uploads/2021/06/Ace-Hardware-1.png', alt: 'Store Logo' })
                            ),
                            createElement(RichText, {
                                tagName: 'h1',
                                multiline: 'p',
                                placeholder: 'Enter your store title here',
                                onChange: (value) => setAttributes({ storeTitle: value }),
                                value: attributes.storeTitle,
                            })
                        ),
                        createElement('div', { className: 'store-info' },
                            createElement('p', null, createElement('strong', null, 'Store Name:'), ' Ace Hardware'),
                            createElement('p', null, createElement('strong', null, 'Category:'), ' Home Improvement'),
                            createElement('p', null, createElement('strong', null, 'Location:'), ' Your City')
                            // Add more store details as needed
                        )
                    ),
                    createElement('div', { id: 'coupon-listings' },
                        createElement('section', { className: 'coupon-listings-store' },
                            createElement('div', { className: 'ajax-coupons' },
                                createElement('div', { className: 'store-listings st-list-coupons couponstore-tpl-full' },
                                    attributes.coupons.map((coupon, index) => (
                                        createElement(CouponItem, {
                                            key: index,
                                            index,
                                            coupon,
                                            onChange: handleCouponChange,
                                            onRemove: handleRemoveCoupon,
                                        })
                                    )),
                                    createElement('div', { className: 'coupon-button-type' },
                                        createElement('button', { onClick: handleAddCoupon }, 'Add Coupon')
                                    )
                                )
                            )
                        )
                    )
                )
            );
        },
        save: function (props) {
            const { attributes } = props;

            return (
                createElement('div', { id: 'content' },
                    createElement('div', { id: 'store-detail' },
                        createElement('div', { className: 'single-store-header' },
                            createElement('div', { className: 'header-store-thumb' },
                                createElement('img', { width: '200', height: '115', src: 'http://127.0.0.1/coupon/wp-content/uploads/2021/06/Ace-Hardware-1.png', alt: 'Store Logo' })
                            ),
                            createElement('h1', null, attributes.storeTitle)
                        ),
                        createElement('div', { className: 'store-info' },
                            createElement('p', null, createElement('strong', null, 'Store Name:'), ' Ace Hardware'),
                            createElement('p', null, createElement('strong', null, 'Category:'), ' Home Improvement'),
                            createElement('p', null, createElement('strong', null, 'Location:'), ' Your City')
                            // Add more store details as needed
                        )
                    ),
                    createElement('div', { id: 'coupon-listings' },
                        createElement('section', { className: 'coupon-listings-store' },
                            createElement('div', { className: 'ajax-coupons' },
                                createElement('div', { className: 'store-listings st-list-coupons couponstore-tpl-full' },
                                    attributes.coupons.map((coupon, index) => (
                                        createElement('div', { className: 'coupon-item', key: index },
                                            createElement('span', { className: 'share-count' }, '10'),
                                            createElement('div', { className: 'coupon-title' }, coupon.title),
                                            createElement('div', { className: 'coupon-des' }, coupon.description),
                                            createElement('div', { className: 'coupon-detail' },
                                                createElement('div', { className: 'coupon-button-type' },
                                                    createElement('a', { href: '#', className: 'coupon-button' }, 'Get Deal')
                                                ),
                                                createElement('div', { className: 'coupon-footer' },
                                                    createElement('ul', null,
                                                        createElement('li', null, createElement('a', { href: '#' }, 'Share')),
                                                        createElement('li', null, createElement('a', { href: '#' }, 'Report'))
                                                    )
                                                )
                                            )
                                        )
                                    ))
                                )
                            )
                        )
                    )
                )
            );
        },
    });

    // Coupon Item Component
    const CouponItem = ({ index, coupon, onChange, onRemove }) => (
        createElement('div', { className: 'coupon-item' },
            createElement('span', { className: 'share-count' }, '10'),
            createElement(RichText, {
                tagName: 'div',
                multiline: 'p',
                placeholder: 'Enter coupon title',
                onChange: (value) => onChange(index, 'title', value),
                value: coupon.title,
            }),
            createElement(RichText, {
                tagName: 'div',
                multiline: 'p',
                placeholder: 'Enter coupon description',
                onChange: (value) => onChange(index, 'description', value),
                value: coupon.description,
            }),
            createElement('div', { className: 'coupon-detail' },
                createElement('div', { className: 'coupon-button-type' },
                    createElement('a', { href: '#', className: 'coupon-button' }, 'Get Deal')
                ),
                createElement('div', { className: 'coupon-footer' },
                    createElement('ul', null,
                        createElement('li', null, createElement('a', { href: '#' }, 'Share')),
                        createElement('li', null, createElement('a', { href: '#', onClick: () => onRemove(index) }, 'Remove'))
                    )
                )
            )
        )
    );

    // Control Panel Block
    registerBlockType('coupon-block/control-panel', {
        title: 'Coupon Control Panel',
        icon: 'admin-settings',
        category: 'common',
        edit: function () {
            return createElement('div', null, 'Coupon Control Panel');
        },
        save: function () {
            return createElement('div', null, 'Coupon Control Panel');
        },
    });

    const { render } = wp.element;
    const { Component } = wp.element;

    class CouponStoreFrontend extends Component {
        render() {
            return (
                createElement('div', { id: 'wpbody-content' },
                    createElement('div', { className: 'wp-block-coupon-block-coupon-store' },
                        createElement('h1', null, 'Coupon Store Frontend'),
                        createElement('div', { id: 'content' },
                            createElement('div', { id: 'store-detail' },
                                createElement('div', { className: 'single-store-header' },
                                    createElement('div', { className: 'header-store-thumb' },
                                        createElement('img', { width: '200', height: '115', src: 'http://127.0.0.1/coupon/wp-content/uploads/2021/06/Ace-Hardware-1.png', alt: 'Store Logo' })
                                    ),
                                    createElement('h1', null, '$25 Cash Back on Ace Hardware Coupons & Promo Codes in June 2021')
                                ),
                                createElement('div', { className: 'store-info' },
                                    createElement('p', null, createElement('strong', null, 'Store Name:'), ' Ace Hardware'),
                                    createElement('p', null, createElement('strong', null, 'Category:'), ' Home Improvement'),
                                    createElement('p', null, createElement('strong', null, 'Location:'), ' Your City')
                                    // Add more store details as needed
                                )
                            ),
                            createElement('div', { id: 'coupon-listings' },
                                createElement('section', { className: 'coupon-listings-store' },
                                    createElement('div', { className: 'ajax-coupons' },
                                        createElement('div', { className: 'store-listings st-list-coupons couponstore-tpl-full' },
                                            createElement(CouponItem, { index: 0, coupon: { title: '50% Off on Paints', description: 'Get 50% off on all paints. Limited time offer.' }, onChange: () => { }, onRemove: () => { } }),
                                            createElement(CouponItem, { index: 1, coupon: { title: 'Free Shipping on Orders Over $50', description: 'Enjoy free shipping on orders over $50. Use code: FREESHIP.' }, onChange: () => { }, onRemove: () => { } })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }

    render(createElement(CouponStoreFrontend), document.getElementById('wpbody-content'));
})();
