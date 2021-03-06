// import { Message } from 'element-ui';
import Message from 'element-ui/lib/message';

export const resource = {
    // /**
    //  * 全局请求参数拦截器，只能有一个，新配置的会覆盖旧的，返回处理过的请求参数
    //  */
    // requestInterceptor(options) {
    //     options.headers = {
    //         ...options.headers,
    //         "xsrf-token": "token"
    //     }
    //     return options;
    // },
    // /**
    //  * 全局请求结果拦截器，只能有一个，新配置的会覆盖旧的，返回空会中断后续处理，不处理的场景返回res
    //  */
    // responseInterceptor(res) {
    //     if (res.data.code === -33) {
    //         // 跳转登录并
    //         ams.callAction('routerPush:/login')
    //         return;
    //     }
    //     return res;
    // },

    api: {
        // 全局默认withCredentials
        withCredentials: true,
        // 全局默认contentType json|form|multipart
        contentType: 'json',
        // 全局成功code
        successCode: 0
    },

    codes: {
        '-1701': function (res, options) {
            if (res.data && res.data.data && res.data.data.redirectUrl) {
                const split = res.data.data.redirectUrl.indexOf('?') >= 0 ? '&' : '?';
                location.href = `${res.data.data.redirectUrl}${split}ams_redirect_url=${encodeURIComponent(location.href)}`;
                return false;
            }
            return res;
        },
        '-1702': function (res, options) {
            Message.error(res.data && res.data.msg || '没有操作权限');
            return false;
        }
    }
};
