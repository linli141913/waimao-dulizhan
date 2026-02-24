export function GoogleAnalytics({ trackingId }: { trackingId: string }) {
    if (!trackingId) return null;

    return (
        <>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
}

export function BaiduAnalytics({ trackingId }: { trackingId: string }) {
    if (!trackingId) return null;

    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${trackingId}";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `,
            }}
        />
    );
}
