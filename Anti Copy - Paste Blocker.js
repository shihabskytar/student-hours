//<![CDATA[
var _0x5323b1 = _0x3616,
    _0x6a6fcb = _0x5aff;
(function(_0x396701, _0x220d88) {
    var _0x585ac1 = _0x3616,
        _0x156217 = _0x5aff,
        _0x472164 = _0x396701();
    while (!![]) {
        try {
            var _0xad343 = parseInt(_0x156217(0x1fc)) / 0x1 + -parseInt(_0x585ac1(0x1ed)) / 0x2 * (parseInt(_0x585ac1(0x200)) / 0x3) + parseInt(_0x585ac1(0x1eb)) / 0x4 + parseInt(_0x585ac1(0x20a)) / 0x5 + parseInt(_0x585ac1(0x1f4)) / 0x6 + -parseInt(_0x156217(0x1f3)) / 0x7 + -parseInt(_0x156217(0x1f6)) / 0x8;
            if (_0xad343 === _0x220d88) break;
            else _0x472164['push'](_0x472164['shift']());
        } catch (_0x4f3182) {
            _0x472164['push'](_0x472164['shift']());
        }
    }
}(_0x1f4b, 0x780bb));
var timeout_result;

function show_atcp_message(_0x4a2b90) {
    var _0x40f367 = _0x3616,
        _0x1f7c3d = _0x5aff;
    if ('' !== _0x4a2b90) {
        var _0x2efd5a = _0x1f7c3d(0x210) + _0x4a2b90;
        document['getElementById'](_0x40f367(0x1e6))[_0x40f367(0x20c)] = _0x2efd5a, document[_0x1f7c3d(0x1fa)]('SH-CP-error-message')[_0x40f367(0x209)] = _0x40f367(0x1f1), clearTimeout(timeout_result), timeout_result = setTimeout(hide_message, 0xbb8);
    }
}

function hide_message() {
    var _0x27d0a9 = _0x5aff,
        _0x2b65e2 = _0x3616;
    document['getElementById'](_0x2b65e2(0x1e6))[_0x27d0a9(0x219)] = 'studenthours-CP\x20warning-CP\x20hideme';
}

function _0x5aff(_0x25448f, _0x1ef06f) {
    var _0x1f4b28 = _0x1f4b();
    return _0x5aff = function(_0x361637, _0x55c9c0) {
        _0x361637 = _0x361637 - 0x1e3;
        var _0x82e166 = _0x1f4b28[_0x361637];
        if (_0x5aff['rNYbBK'] === undefined) {
            var _0x467e28 = function(_0x5affc7) {
                var _0x313988 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
                var _0x581a6d = '',
                    _0x58561a = '';
                for (var _0x526fde = 0x0, _0xe6b9ce, _0x5e2103, _0x4a2b90 = 0x0; _0x5e2103 = _0x5affc7['charAt'](_0x4a2b90++); ~_0x5e2103 && (_0xe6b9ce = _0x526fde % 0x4 ? _0xe6b9ce * 0x40 + _0x5e2103 : _0x5e2103, _0x526fde++ % 0x4) ? _0x581a6d += String['fromCharCode'](0xff & _0xe6b9ce >> (-0x2 * _0x526fde & 0x6)) : 0x0) {
                    _0x5e2103 = _0x313988['indexOf'](_0x5e2103);
                }
                for (var _0x2efd5a = 0x0, _0x1204a8 = _0x581a6d['length']; _0x2efd5a < _0x1204a8; _0x2efd5a++) {
                    _0x58561a += '%' + ('00' + _0x581a6d['charCodeAt'](_0x2efd5a)['toString'](0x10))['slice'](-0x2);
                }
                return decodeURIComponent(_0x58561a);
            };
            _0x5aff['ZKKbxC'] = _0x467e28, _0x25448f = arguments, _0x5aff['rNYbBK'] = !![];
        }
        var _0x91608d = _0x1f4b28[0x0],
            _0x29f504 = _0x361637 + _0x91608d,
            _0x2a5ebc = _0x25448f[_0x29f504];
        return !_0x2a5ebc ? (_0x82e166 = _0x5aff['ZKKbxC'](_0x82e166), _0x25448f[_0x29f504] = _0x82e166) : _0x82e166 = _0x2a5ebc, _0x82e166;
    }, _0x5aff(_0x25448f, _0x1ef06f);
}
var image_save_msg = _0x6a6fcb(0x202),
    no_menu_msg = _0x6a6fcb(0x1ee),
    smessage = _0x6a6fcb(0x1e7);

function disableEnterKey(_0x1204a8) {
    var _0x16d67b = _0x3616,
        _0x3a6948 = _0x6a6fcb,
        _0x18a5ea;
    if (_0x1204a8[_0x3a6948(0x213)]) return 0x61 != (_0x18a5ea = window[_0x16d67b(0x1ef)] ? window[_0x3a6948(0x218)]['keyCode'] : _0x1204a8[_0x3a6948(0x1f7)]) && 0x41 != _0x18a5ea && 0x43 != _0x18a5ea && 0x63 != _0x18a5ea && 0x58 != _0x18a5ea && 0x78 != _0x18a5ea && 0x1a != _0x18a5ea && 0x55 != _0x18a5ea && 0x56 != _0x18a5ea && 0x53 != _0x18a5ea && 0x2b != _0x18a5ea || (show_atcp_message(_0x3a6948(0x217)), !0x1);
}

function disable_copy(_0x3f7b48) {
    var _0x50d04d = _0x3616,
        _0x30bdf7 = _0x6a6fcb,
        _0x3fbd0b = _0x3f7b48[_0x30bdf7(0x1f9)][_0x50d04d(0x1e9)],
        _0x2d91d4 = /Safari/ ['test'](navigator['userAgent']) && /Apple Computer/ [_0x50d04d(0x206)](navigator[_0x30bdf7(0x20f)]);
    if (_0x30bdf7(0x1fe) != (_0x3fbd0b = _0x3fbd0b[_0x50d04d(0x207)]()) && _0x50d04d(0x1e5) != _0x3fbd0b && _0x30bdf7(0x1f0) != _0x3fbd0b && _0x50d04d(0x214) != _0x3fbd0b && 'SELECT' != _0x3fbd0b) return '' !== smessage && 0x2 == _0x3f7b48[_0x30bdf7(0x1e4)] && show_atcp_message(smessage), !!_0x2d91d4;
}

function disable_copy_ie() {
    var _0x503319 = _0x6a6fcb,
        _0x7161da = _0x3616,
        _0x1741c1 = window[_0x7161da(0x1ef)]['srcElement'][_0x503319(0x208)];
    return _0x7161da(0x21b) == (_0x1741c1 = _0x1741c1['toUpperCase']()) ? (show_atcp_message(alertMsg_IMG), !0x1) : (_0x503319(0x1fe) == _0x1741c1 || _0x503319(0x1ff) == _0x1741c1 || _0x503319(0x1f0) == _0x1741c1 || _0x7161da(0x214) == _0x1741c1 || _0x7161da(0x1ec) == _0x1741c1) && void 0x0;
}

function reEnable() {
    return !0x0;
}

function disableSelection(_0x1a7ac0) {
    var _0x124159 = _0x6a6fcb,
        _0x25b463 = _0x3616;
    void 0x0 !== _0x1a7ac0[_0x25b463(0x1f5)] ? _0x1a7ac0['onselectstart'] = disable_copy_ie : void 0x0 !== _0x1a7ac0[_0x25b463(0x201)][_0x25b463(0x211)] ? _0x1a7ac0[_0x25b463(0x201)][_0x124159(0x20b)] = _0x124159(0x1fb) : _0x1a7ac0[_0x124159(0x1ea)] = function() {
        return !0x1;
    }, _0x1a7ac0[_0x124159(0x215)][_0x124159(0x1fd)] = _0x25b463(0x204);
}

function _0x1f4b() {
    var _0x199a74 = ['SH-CP-error-message', 'q29UDgvUDcbPCYbWCM90zwn0zwqGiseG', 'mZu3odG3nKrmzNzUuG', 'nodeName', 'B25TB3vZzwrVD24', '3578876DLfvnR', 'SELECT', '293348STzSND', 'q29UDgv4Dcbnzw51igrPC2fIBgvKiq', 'event', 'su5qvvq', 'studenthours-CP\x20warning-CP\x20showme', 'tvnjrq', 'ndK3oda0m0jNANzpEq', '3570588ZjFllh', 'onselectstart', 'oti1nda1nLH0BNLvrq', 'D2HPy2G', 'ondragstart', 'DgfYz2v0', 'z2v0rwXLBwvUDej5swq', 'BM9Uzq', 'odq3nZK4sxL2z0DN', 'y3vYC29Y', 'vevyva', 'vevyvefsrue', '9rmFjvV', 'style', 'ww91ienHBIboB3qGu2f2zsbPBwfNzxmH', 'mJKZmZq4u1r6u05e', 'default', 'Dw5ZzwXLy3rHyMXL', 'test', 'toUpperCase', 'BM9Kzu5HBwu', 'className', '2310100KZKVdZ', 'tw96vxnLCLnLBgvJDa', 'innerHTML', 'B25SB2fK', 'yM9KEq', 'DMvUzg9Y', 'phnWyw4+iefSzxj0oIa8l3nWyw4+', 'MozUserSelect', 'body', 'y3rYBeTLEq', 'PASSWORD', 'C3r5Bgu', 'onmousedown', 'DMLLDYbZB3vYy2uGzgLZywjSzwq', 'zxzLBNq', 'y2XHC3noyw1L', 'onkeydown', 'IMG', '4978043BgjvOy', 'zgv0ywLS', 'TEXTAREA'];
    _0x1f4b = function() {
        return _0x199a74;
    };
    return _0x1f4b();
}

function nocontext(_0x163e22) {
    return !0x1;
}

function _0x3616(_0x25448f, _0x1ef06f) {
    var _0x1f4b28 = _0x1f4b();
    return _0x3616 = function(_0x361637, _0x55c9c0) {
        _0x361637 = _0x361637 - 0x1e3;
        var _0x82e166 = _0x1f4b28[_0x361637];
        return _0x82e166;
    }, _0x3616(_0x25448f, _0x1ef06f);
}
document[_0x5323b1(0x21a)] = disableEnterKey, document[_0x5323b1(0x1f5)] = disable_copy_ie, -0x1 == navigator['userAgent']['indexOf'](_0x6a6fcb(0x1f2)) && (document[_0x5323b1(0x216)] = disable_copy, document['onclick'] = reEnable), window[_0x6a6fcb(0x20d)] = function() {
    var _0x20f88c = _0x5323b1;
    disableSelection(document[_0x20f88c(0x212)]);
}, document[_0x5323b1(0x1f8)] = function() {
    return !0x1;
}, document['oncontextmenu'] = nocontext;
var e = document['getElementsByTagName'](_0x6a6fcb(0x20e))[0x0];
e && e['setAttribute'](_0x6a6fcb(0x205), on);
//]]>