let codeBase64Lookup = 'ZnVuY3Rpb24gcmVzcG9uc2VVUkwoYSl7cmV0dXJuJ3Jlc3BvbnNlVVJMJ2luIGE/YS5yZXNwb25zZVVSTDovXlgtUmVxdWVzdC1VUkw6L20udGVzdChhLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKT9hLmdldFJlc3BvbnNlSGVhZGVyKCdYLVJlcXVlc3QtVVJMJyk6dm9pZCAwfWZ1bmN0aW9uIGhlYWRlcnMoYSl7dmFyIGI9bmV3IEhlYWRlcnMsYz1hLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnRyaW0oKS5zcGxpdCgnXG4nKTtyZXR1cm4gYy5mb3JFYWNoKGZ1bmN0aW9uKGQpe3ZhciBmPWQudHJpbSgpLnNwbGl0KCc6JyksZz1mLnNoaWZ0KCkudHJpbSgpLGg9Zi5qb2luKCc6JykudHJpbSgpO2IuYXBwZW5kKGcsaCl9KSxifWZ1bmN0aW9uIGdldFhocigpe2lmKCd1bmRlZmluZWQnIT10eXBlb2YgWE1MSHR0cFJlcXVlc3QpcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtmb3IodmFyIGE9WydNU1hNTDIuWG1sSHR0cC43di4wJywnTVNYTUwyLlhtbEh0dHAuNi4wJywnTVNYTUwyLlhtbEh0dHAuNS4wJywnTVNYTUwyLlhtbEh0dHAuNC4wJywnTVNYTUwyLlhtbEh0dHAuMy4wJywnTVNYTUwyLlhtbEh0dHAuMi4wJywnTWljcm9zb2Z0LlhtbEh0dHAnXSxiPTAsYz1hLmxlbmd0aDtiPGM7YisrKXRyeXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoYVtiXSl9Y2F0Y2goZCl7fX12YXIgeGhyO2Z1bmN0aW9uIGxvYWQoYSxiLGMpe3hocj14aHJ8fGdldFhocigpLDQhPT14aHIucmVhZHlTdGF0ZSYmeGhyLmFib3J0KCk7dmFyIGQ9bmV3IFJlcXVlc3QoYSx7bWV0aG9kOidHRVQnfSk7eGhyLm9ubG9hZD1mdW5jdGlvbigpe3ZhciBmPTEyMjM9PT14aHIuc3RhdHVzPzIwNDp4aHIuc3RhdHVzO2lmKDEwMD5mfHw1OTk8ZilyZXR1cm4gdm9pZCBjKHt4aHI6eGhyLHN0YXR1czpmfSk7dmFyIGc9e3N0YXR1czpmLHN0YXR1c1RleHQ6eGhyLnN0YXR1c1RleHQsaGVhZGVyczpoZWFkZXJzKHhociksdXJsOnJlc3BvbnNlVVJMKHhocil9LGg9J3Jlc3BvbnNlJ2luIHhocj94aHIucmVzcG9uc2U6eGhyLnJlc3BvbnNlVGV4dDtuZXcgUmVzcG9uc2UoaCxnKS5qc29uKCkudGhlbihqPT57YyhudWxsLGopfSkuY2F0Y2goaj0+e2MoaixudWxsKX0pfSx4aHIub25lcnJvcj1mdW5jdGlvbigpe2Moe3hocjp4aHIsc3RhdHVzOnhoci5zdGF0dXN9KX0seGhyLm9wZW4oZC5tZXRob2QsZC51cmwsITApLCdpbmNsdWRlJz09PWQuY3JlZGVudGlhbHMmJih4aHIud2l0aENyZWRlbnRpYWxzPSEwKSwncmVzcG9uc2VUeXBlJ2luIHhociYmJ2Z1bmN0aW9uJz09dHlwZW9mIFJlcXVlc3QucHJvdG90eXBlLmJsb2ImJih4aHIucmVzcG9uc2VUeXBlPSdibG9iJyksZC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oZixnKXt4aHIuc2V0UmVxdWVzdEhlYWRlcihnLGYpfSkseGhyLnNlbmQoJ3VuZGVmaW5lZCc9PXR5cGVvZiBkLl9ib2R5SW5pdD9udWxsOmQuX2JvZHlJbml0KX12YXIgZGF0YVNwZWNpYWxDaGFyYWN0ZXIsd2l0aF9sYW5kPVtdO2Z1bmN0aW9uIGFuYWx5c2lzRGF0YShhKXt2YXIgYj17fSxjPXt9O2EuZm9yRWFjaChmdW5jdGlvbihmKXtjW2YudmFsdWVdPWNbZi52YWx1ZV18fFtmLmZpZWxkXSxiW2YuZmllbGRdPWJbZi5maWVsZF18fFtdLGJbZi5maWVsZF0ucHVzaChmLnZhbHVlKX0pO3ZhciBkPVtdO3JldHVybiBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGYpe2QucHVzaChmKTtsZXQgZz1jW2ZdLGg9Z1swXSxqPWJbaF0uZmlsdGVyKGs9PmshPT1mKTtjW2ZdPWcuY29uY2F0KGopfSkse3NwZWNpY2FsQ2hhcmFjdGVyOk9iamVjdC5hc3NpZ24oe30sYixjKSxhbGw6ZH19ZnVuY3Rpb24gc2VuZChhLGIsYyl7cG9zdE1lc3NhZ2UoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7aW5zdGFuY2VJZDphLHBheWxvYWQ6e2xvb2t1cERhdGFzOmIsbWV0YWRhdGE6Y319KSkpfWZ1bmN0aW9uIGdldFNwZWNpYWwoYSxiLGMpe2lmKGEuaXNGdWxsKXNlbmQoYixbZGF0YVNwZWNpYWxDaGFyYWN0ZXIuYWxsXSxjKTtlbHNlIGlmKGEubGFuZCYmMDxhLmxhbmQubGVuZ3RoJiYhYS5sYW5kLmluY2x1ZGVzKCdBbGwnKSl7dmFyIGQ9d2l0aF9sYW5kLmZpbHRlcihmdW5jdGlvbihmKXtyZXR1cm4gYS5jaGFyYWN0ZXI9PT1mLmZpZWxkJiZhLmxhbmQuaW5jbHVkZXMoZi5sYW5kKX0pLm1hcChmdW5jdGlvbihmKXtyZXR1cm4gZi52YWx1ZX0pO3NlbmQoYixbZF0sYyl9ZWxzZXt2YXIgZD1kYXRhU3BlY2lhbENoYXJhY3Rlci5zcGVjaWNhbENoYXJhY3RlclthLmNoYXJhY3Rlcl07c2VuZChiLFtkXSxjKX19dGhpcy5vbm1lc3NhZ2U9ZnVuY3Rpb24oYSl7dmFyIGI9YS5kYXRhLmluc3RhbmNlSWQsYz1hLmRhdGEubWV0YWRhdGEsZD1jLnNwZWNpYWw7aWYoZClkYXRhU3BlY2lhbENoYXJhY3Rlcj9nZXRTcGVjaWFsKGQsYixjKTpsb2FkKGQudXJpLGMsZnVuY3Rpb24oayxsKXt3aXRoX2xhbmQ9bC53aXRoX2xhbmQsZGF0YVNwZWNpYWxDaGFyYWN0ZXI9YW5hbHlzaXNEYXRhKGwud2l0aG91dF9sYW5kKSxnZXRTcGVjaWFsKGQsYixjKX0pO2Vsc2V7dmFyIGY9Yy5sb29rdXBDb25maWc7aWYoZi5hcmd1bWVudF9kZXRhaWxzKXt2YXIgZz1mLmFyZ3VtZW50X2RldGFpbHMubWFwKGZ1bmN0aW9uKGspe3JldHVybntkYXRhX3ZhbHVlOmsudmFsdWV9fSk7c2VuZChiLFtnXSxjKX1lbHNle3ZhciBqPWYubG9va3VwVXJsKycvJytjLnBhcmFtcztsb2FkKGosYS5kYXRhLm1ldGFkYXRhLGZ1bmN0aW9uKGssbCl7aWYoIWspe3ZhciBtO0FycmF5LmlzQXJyYXkobC5qc29uX3NpbmdsZSkmJihmLmFsbG93X211bHRpcGxlJiZBcnJheS5pc0FycmF5KGwuanNvbl9tdWx0aSkmJjA8bC5qc29uX211bHRpLmxlbmd0aD9tPVtsLmpzb25fc2luZ2xlLGwuanNvbl9tdWx0aV06bT1bbC5qc29uX3NpbmdsZV0pLHNlbmQoYixtLGMpfWVsc2UgcG9zdE1lc3NhZ2UoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7aW5zdGFuY2VJZDpiLHBheWxvYWQ6e2Vycm9yOmssbWV0YWRhdGE6Y319KSkpfSl9fX07';
// let codeBase64Lookup ='ZnVuY3Rpb24gcmVzcG9uc2VVUkwoYSl7cmV0dXJuJ3Jlc3BvbnNlVVJMJ2luIGE/YS5yZXNwb25zZVVSTDovXlgtUmVxdWVzdC1VUkw6L20udGVzdChhLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKT9hLmdldFJlc3BvbnNlSGVhZGVyKCdYLVJlcXVlc3QtVVJMJyk6dm9pZCAwfWZ1bmN0aW9uIGhlYWRlcnMoYSl7dmFyIGI9bmV3IEhlYWRlcnMsYz1hLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnRyaW0oKS5zcGxpdCgnXG4nKTtyZXR1cm4gYy5mb3JFYWNoKGZ1bmN0aW9uKGQpe3ZhciBmPWQudHJpbSgpLnNwbGl0KCc6JyksZz1mLnNoaWZ0KCkudHJpbSgpLGg9Zi5qb2luKCc6JykudHJpbSgpO2IuYXBwZW5kKGcsaCl9KSxifWZ1bmN0aW9uIGdldFhocigpe2lmKCd1bmRlZmluZWQnIT10eXBlb2YgWE1MSHR0cFJlcXVlc3QpcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtmb3IodmFyIGE9WydNU1hNTDIuWG1sSHR0cC43di4wJywnTVNYTUwyLlhtbEh0dHAuNi4wJywnTVNYTUwyLlhtbEh0dHAuNS4wJywnTVNYTUwyLlhtbEh0dHAuNC4wJywnTVNYTUwyLlhtbEh0dHAuMy4wJywnTVNYTUwyLlhtbEh0dHAuMi4wJywnTWljcm9zb2Z0LlhtbEh0dHAnXSxiPTAsYz1hLmxlbmd0aDtiPGM7YisrKXRyeXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoYVtiXSl9Y2F0Y2goZCl7fX12YXIgeGhyO2Z1bmN0aW9uIGxvYWQoYSxiLGMpe3hocj14aHJ8fGdldFhocigpLDQhPT14aHIucmVhZHlTdGF0ZSYmeGhyLmFib3J0KCk7dmFyIGQ9bmV3IFJlcXVlc3QoYSx7bWV0aG9kOidHRVQnfSk7eGhyLm9ubG9hZD1mdW5jdGlvbigpe3ZhciBmPTEyMjM9PT14aHIuc3RhdHVzPzIwNDp4aHIuc3RhdHVzO2lmKDEwMD5mfHw1OTk8ZilyZXR1cm4gdm9pZCBjKHt4aHI6eGhyLHN0YXR1czpmfSk7dmFyIGc9e3N0YXR1czpmLHN0YXR1c1RleHQ6eGhyLnN0YXR1c1RleHQsaGVhZGVyczpoZWFkZXJzKHhociksdXJsOnJlc3BvbnNlVVJMKHhocil9LGg9J3Jlc3BvbnNlJ2luIHhocj94aHIucmVzcG9uc2U6eGhyLnJlc3BvbnNlVGV4dDtuZXcgUmVzcG9uc2UoaCxnKS5qc29uKCkudGhlbihqPT57YyhudWxsLGopfSkuY2F0Y2goaj0+e2MoaixudWxsKX0pfSx4aHIub25lcnJvcj1mdW5jdGlvbigpe2Moe3hocjp4aHIsc3RhdHVzOnhoci5zdGF0dXN9KX0seGhyLm9wZW4oZC5tZXRob2QsZC51cmwsITApLCdpbmNsdWRlJz09PWQuY3JlZGVudGlhbHMmJih4aHIud2l0aENyZWRlbnRpYWxzPSEwKSwncmVzcG9uc2VUeXBlJ2luIHhociYmJ2Z1bmN0aW9uJz09dHlwZW9mIFJlcXVlc3QucHJvdG90eXBlLmJsb2ImJih4aHIucmVzcG9uc2VUeXBlPSdibG9iJyksZC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oZixnKXt4aHIuc2V0UmVxdWVzdEhlYWRlcihnLGYpfSkseGhyLnNlbmQoJ3VuZGVmaW5lZCc9PXR5cGVvZiBkLl9ib2R5SW5pdD9udWxsOmQuX2JvZHlJbml0KX12YXIgZGF0YVNwZWNpYWxDaGFyYWN0ZXIsYWxsU3BlY2lhbENoYXJhY3Rlcj1bXTtmdW5jdGlvbiBhbmFseXNpc0RhdGEoYSl7dmFyIGI9e30sYz17fTthLmZvckVhY2goZnVuY3Rpb24oZil7Y1tmLnZhbHVlXT1jW2YudmFsdWVdfHxbZi5maWVsZF0sYltmLmZpZWxkXT1iW2YuZmllbGRdfHxbXSxiW2YuZmllbGRdLnB1c2goZi52YWx1ZSl9KTt2YXIgZD1bXTtyZXR1cm4gT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihmKXtkLnB1c2goZik7bGV0IGc9Y1tmXSxoPWdbMF0saj1iW2hdLmZpbHRlcihrPT5rIT09Zik7Y1tmXT1nLmNvbmNhdChqKX0pLHtzcGVjaWNhbENoYXJhY3RlcjpPYmplY3QuYXNzaWduKHt9LGIsYyksYWxsOmR9fXRoaXMub25tZXNzYWdlPWZ1bmN0aW9uKGEpe3ZhciBiPWEuZGF0YS5pbnN0YW5jZUlkLGM9YS5kYXRhLm1ldGFkYXRhLGQ9Yy5zcGVjaWFsO2lmKCFkKXt2YXIgZz1jLmxvb2t1cENvbmZpZztpZihnLmFyZ3VtZW50X2RldGFpbHMpe3ZhciBoPWcuYXJndW1lbnRfZGV0YWlscy5tYXAoZnVuY3Rpb24oayl7cmV0dXJue2RhdGFfdmFsdWU6ay52YWx1ZX19KSxmPVtoXTtwb3N0TWVzc2FnZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6ZixtZXRhZGF0YTpjfX0pKSl9ZWxzZXt2YXIgaj1nLmxvb2t1cFVybCsnLycrYy5wYXJhbXM7bG9hZChqLGEuZGF0YS5tZXRhZGF0YSxmdW5jdGlvbihrLGwpe2lmKCFrKXt2YXIgbTtBcnJheS5pc0FycmF5KGwuanNvbl9zaW5nbGUpJiYoZy5hbGxvd19tdWx0aXBsZSYmQXJyYXkuaXNBcnJheShsLmpzb25fbXVsdGkpJiYwPGwuanNvbl9tdWx0aS5sZW5ndGg/bT1bbC5qc29uX3NpbmdsZSxsLmpzb25fbXVsdGldOm09W2wuanNvbl9zaW5nbGVdKSxwb3N0TWVzc2FnZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6bSxtZXRhZGF0YTpjfX0pKSl9ZWxzZSBwb3N0TWVzc2FnZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7ZXJyb3I6ayxtZXRhZGF0YTpjfX0pKSl9KX19ZWxzZSBpZighZGF0YVNwZWNpYWxDaGFyYWN0ZXIpbG9hZChkLnVyaSxjLGZ1bmN0aW9uKGssbCl7ZGF0YVNwZWNpYWxDaGFyYWN0ZXI9YW5hbHlzaXNEYXRhKGwud2l0aG91dF9sYW5kKTt2YXIgbT1kLmlzRnVsbD9kYXRhU3BlY2lhbENoYXJhY3Rlci5hbGw6ZGF0YVNwZWNpYWxDaGFyYWN0ZXIuc3BlY2ljYWxDaGFyYWN0ZXJbY2hhcmFjdGVyXTtwb3N0TWVzc2FnZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6W21dLG1ldGFkYXRhOmN9fSkpKX0pO2Vsc2V7dmFyIGY9ZC5pc0Z1bGw/ZGF0YVNwZWNpYWxDaGFyYWN0ZXIuYWxsOmRhdGFTcGVjaWFsQ2hhcmFjdGVyLnNwZWNpY2FsQ2hhcmFjdGVyW2NoYXJhY3Rlcl07cG9zdE1lc3NhZ2UoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7aW5zdGFuY2VJZDpiLHBheWxvYWQ6e2xvb2t1cERhdGFzOltmXSxtZXRhZGF0YTpjfX0pKSl9fTs=';
// let  codeBase64Lookup ='J3VzZSBzdHJpY3QnO2Z1bmN0aW9uIHJlc3BvbnNlVVJMKGEpe3JldHVybidyZXNwb25zZVVSTCdpbiBhP2EucmVzcG9uc2VVUkw6L15YLVJlcXVlc3QtVVJMOi9tLnRlc3QoYS5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk/YS5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpOnZvaWQgMH1mdW5jdGlvbiBoZWFkZXJzKGEpe3ZhciBiPW5ldyBIZWFkZXJzLGM9YS5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKS50cmltKCkuc3BsaXQoJ1xuJyk7cmV0dXJuIGMuZm9yRWFjaChmdW5jdGlvbihkKXt2YXIgZj1kLnRyaW0oKS5zcGxpdCgnOicpLGc9Zi5zaGlmdCgpLnRyaW0oKSxoPWYuam9pbignOicpLnRyaW0oKTtiLmFwcGVuZChnLGgpfSksYn1mdW5jdGlvbiBnZXRYaHIoKXtpZigndW5kZWZpbmVkJyE9dHlwZW9mIFhNTEh0dHBSZXF1ZXN0KXJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7Zm9yKHZhciBhPVsnTVNYTUwyLlhtbEh0dHAuN3YuMCcsJ01TWE1MMi5YbWxIdHRwLjYuMCcsJ01TWE1MMi5YbWxIdHRwLjUuMCcsJ01TWE1MMi5YbWxIdHRwLjQuMCcsJ01TWE1MMi5YbWxIdHRwLjMuMCcsJ01TWE1MMi5YbWxIdHRwLjIuMCcsJ01pY3Jvc29mdC5YbWxIdHRwJ10sYj0wLGM9YS5sZW5ndGg7YjxjO2IrKyl0cnl7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KGFbYl0pfWNhdGNoKGQpe319dmFyIHhocjtmdW5jdGlvbiBsb2FkKGEsYixjKXt4aHI9eGhyfHxnZXRYaHIoKSw0IT09eGhyLnJlYWR5U3RhdGUmJnhoci5hYm9ydCgpO3ZhciBkPW5ldyBSZXF1ZXN0KGEse21ldGhvZDonR0VUJ30pO3hoci5vbmxvYWQ9ZnVuY3Rpb24oKXt2YXIgZj0xMjIzPT09eGhyLnN0YXR1cz8yMDQ6eGhyLnN0YXR1cztpZigxMDA+Znx8NTk5PGYpcmV0dXJuIHZvaWQgYyh7eGhyOnhocixzdGF0dXM6Zn0pO3ZhciBnPXtzdGF0dXM6ZixzdGF0dXNUZXh0Onhoci5zdGF0dXNUZXh0LGhlYWRlcnM6aGVhZGVycyh4aHIpLHVybDpyZXNwb25zZVVSTCh4aHIpfSxoPSdyZXNwb25zZSdpbiB4aHI/eGhyLnJlc3BvbnNlOnhoci5yZXNwb25zZVRleHQ7bmV3IFJlc3BvbnNlKGgsZykuanNvbigpLnRoZW4oZnVuY3Rpb24oail7YyhudWxsLGopfSkuY2F0Y2goZnVuY3Rpb24oail7YyhqLG51bGwpfSl9LHhoci5vbmVycm9yPWZ1bmN0aW9uKCl7Yyh7eGhyOnhocixzdGF0dXM6eGhyLnN0YXR1c30pfSx4aHIub3BlbihkLm1ldGhvZCxkLnVybCwhMCksJ2luY2x1ZGUnPT09ZC5jcmVkZW50aWFscyYmKHhoci53aXRoQ3JlZGVudGlhbHM9ITApLCdyZXNwb25zZVR5cGUnaW4geGhyJiYnZnVuY3Rpb24nPT10eXBlb2YgUmVxdWVzdC5wcm90b3R5cGUuYmxvYiYmKHhoci5yZXNwb25zZVR5cGU9J2Jsb2InKSxkLmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihmLGcpe3hoci5zZXRSZXF1ZXN0SGVhZGVyKGcsZil9KSx4aHIuc2VuZCgndW5kZWZpbmVkJz09dHlwZW9mIGQuX2JvZHlJbml0P251bGw6ZC5fYm9keUluaXQpfXZhciBkYXRhU3BlY2lhbENoYXJhY3RlcixhbGxTcGVjaWFsQ2hhcmFjdGVyPVtdO2Z1bmN0aW9uIGFuYWx5c2lzRGF0YShhKXt2YXIgYj17fSxjPXt9O2EuZm9yRWFjaChmdW5jdGlvbihmKXtjW2YudmFsdWVdPWNbZi52YWx1ZV18fFtmLmZpZWxkXSxiW2YuZmllbGRdPWJbZi5maWVsZF18fFtdLGJbZi5maWVsZF0ucHVzaChmLnZhbHVlKX0pO3ZhciBkPVtdO3JldHVybiBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGYpe2QucHVzaChmKTt2YXIgZz1jW2ZdLGg9Z1swXSxqPWJbaF0uZmlsdGVyKGZ1bmN0aW9uKGspe3JldHVybiBrIT09Zn0pO2NbZl09Zy5jb25jYXQoail9KSx7c3BlY2ljYWxDaGFyYWN0ZXI6T2JqZWN0LmFzc2lnbih7fSxiLGMpLGFsbDpkfX10aGlzLm9ubWVzc2FnZT1mdW5jdGlvbihhKXt2YXIgYj1hLmRhdGEuaW5zdGFuY2VJZCxjPWEuZGF0YS5tZXRhZGF0YSxkPWMuc3BlY2lhbDtpZihkKXt2YXIgZj1kLmNoYXJhY3RlcjtpZighZGF0YVNwZWNpYWxDaGFyYWN0ZXIpbG9hZChkLnVyaSxjLGZ1bmN0aW9uKGssbCl7ZGF0YVNwZWNpYWxDaGFyYWN0ZXI9YW5hbHlzaXNEYXRhKGwud2l0aG91dF9sYW5kKTt2YXIgbT1kLmlzRnVsbD9kYXRhU3BlY2lhbENoYXJhY3Rlci5hbGw6ZGF0YVNwZWNpYWxDaGFyYWN0ZXIuc3BlY2ljYWxDaGFyYWN0ZXJbZl07cG9zdE1lc3NhZ2UoSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh7aW5zdGFuY2VJZDpiLHBheWxvYWQ6e2xvb2t1cERhdGFzOlttXSxtZXRhZGF0YTpjfX0pKSl9KTtlbHNle3ZhciBnPWQuaXNGdWxsP2RhdGFTcGVjaWFsQ2hhcmFjdGVyLmFsbDpkYXRhU3BlY2lhbENoYXJhY3Rlci5zcGVjaWNhbENoYXJhY3RlcltmXTtwb3N0TWVzc2FnZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6W2ddLG1ldGFkYXRhOmN9fSkpKX19ZWxzZXt2YXIgaD1jLmxvb2t1cENvbmZpZyxqPWgubG9va3VwVXJsKycvJytjLnBhcmFtcztsb2FkKGosYS5kYXRhLm1ldGFkYXRhLGZ1bmN0aW9uKGssbCl7aWYoIWspe3ZhciBtO0FycmF5LmlzQXJyYXkobC5qc29uX3NpbmdsZSkmJihoLmFsbG93X211bHRpcGxlJiZBcnJheS5pc0FycmF5KGwuanNvbl9tdWx0aSk/bT1bbC5qc29uX3NpbmdsZSxsLmpzb25fbXVsdGldOm09W2wuanNvbl9zaW5nbGVdKSxwb3N0TWVzc2FnZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6bSxtZXRhZGF0YTpjfX0pKSl9ZWxzZSBwb3N0TWVzc2FnZShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7ZXJyb3I6ayxtZXRhZGF0YTpjfX0pKSl9KX19Ow==';
// let codeBase64Lookup = 'J3VzZSBzdHJpY3QnO2Z1bmN0aW9uIHJlc3BvbnNlVVJMKGEpe3JldHVybidyZXNwb25zZVVSTCdpbiBhP2EucmVzcG9uc2VVUkw6L15YLVJlcXVlc3QtVVJMOi9tLnRlc3QoYS5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk/YS5nZXRSZXNwb25zZUhlYWRlcignWC1SZXF1ZXN0LVVSTCcpOnZvaWQgMH1mdW5jdGlvbiBoZWFkZXJzKGEpe3ZhciBiPW5ldyBIZWFkZXJzLGM9YS5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKS50cmltKCkuc3BsaXQoJ1xuJyk7cmV0dXJuIGMuZm9yRWFjaChmdW5jdGlvbihkKXt2YXIgZj1kLnRyaW0oKS5zcGxpdCgnOicpLGc9Zi5zaGlmdCgpLnRyaW0oKSxoPWYuam9pbignOicpLnRyaW0oKTtiLmFwcGVuZChnLGgpfSksYn1mdW5jdGlvbiBnZXRYaHIoKXtpZigndW5kZWZpbmVkJyE9dHlwZW9mIFhNTEh0dHBSZXF1ZXN0KXJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7Zm9yKHZhciBhPVsnTVNYTUwyLlhtbEh0dHAuN3YuMCcsJ01TWE1MMi5YbWxIdHRwLjYuMCcsJ01TWE1MMi5YbWxIdHRwLjUuMCcsJ01TWE1MMi5YbWxIdHRwLjQuMCcsJ01TWE1MMi5YbWxIdHRwLjMuMCcsJ01TWE1MMi5YbWxIdHRwLjIuMCcsJ01pY3Jvc29mdC5YbWxIdHRwJ10sYj0wLGM9YS5sZW5ndGg7YjxjO2IrKyl0cnl7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KGFbYl0pfWNhdGNoKGQpe319dmFyIHhocjtmdW5jdGlvbiBsb2FkKGEsYixjKXt4aHI9eGhyfHxnZXRYaHIoKSw0IT09eGhyLnJlYWR5U3RhdGUmJnhoci5hYm9ydCgpO3ZhciBkPW5ldyBSZXF1ZXN0KGEse21ldGhvZDonR0VUJ30pO3hoci5vbmxvYWQ9ZnVuY3Rpb24oKXt2YXIgZj0xMjIzPT09eGhyLnN0YXR1cz8yMDQ6eGhyLnN0YXR1cztpZigxMDA+Znx8NTk5PGYpcmV0dXJuIHZvaWQgYyh7eGhyOnhocixzdGF0dXM6Zn0pO3ZhciBnPXtzdGF0dXM6ZixzdGF0dXNUZXh0Onhoci5zdGF0dXNUZXh0LGhlYWRlcnM6aGVhZGVycyh4aHIpLHVybDpyZXNwb25zZVVSTCh4aHIpfSxoPSdyZXNwb25zZSdpbiB4aHI/eGhyLnJlc3BvbnNlOnhoci5yZXNwb25zZVRleHQ7bmV3IFJlc3BvbnNlKGgsZykuanNvbigpLnRoZW4oZnVuY3Rpb24oail7YyhudWxsLGopfSkuY2F0Y2goZnVuY3Rpb24oail7YyhqLG51bGwpfSl9LHhoci5vbmVycm9yPWZ1bmN0aW9uKCl7Yyh7eGhyOnhocixzdGF0dXM6eGhyLnN0YXR1c30pfSx4aHIub3BlbihkLm1ldGhvZCxkLnVybCwhMCksJ2luY2x1ZGUnPT09ZC5jcmVkZW50aWFscyYmKHhoci53aXRoQ3JlZGVudGlhbHM9ITApLCdyZXNwb25zZVR5cGUnaW4geGhyJiYnZnVuY3Rpb24nPT10eXBlb2YgUmVxdWVzdC5wcm90b3R5cGUuYmxvYiYmKHhoci5yZXNwb25zZVR5cGU9J2Jsb2InKSxkLmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihmLGcpe3hoci5zZXRSZXF1ZXN0SGVhZGVyKGcsZil9KSx4aHIuc2VuZCgndW5kZWZpbmVkJz09dHlwZW9mIGQuX2JvZHlJbml0P251bGw6ZC5fYm9keUluaXQpfXZhciBkYXRhU3BlY2lhbENoYXJhY3RlcixhbGxTcGVjaWFsQ2hhcmFjdGVyPVtdO2Z1bmN0aW9uIGFuYWx5c2lzRGF0YShhKXt2YXIgYj17fSxjPXt9O2EuZm9yRWFjaChmdW5jdGlvbihmKXtjW2YudmFsdWVdPWNbZi52YWx1ZV18fFtmLmZpZWxkXSxiW2YuZmllbGRdPWJbZi5maWVsZF18fFtdLGJbZi5maWVsZF0ucHVzaChmLnZhbHVlKX0pO3ZhciBkPVtdO3JldHVybiBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGYpe2QucHVzaChmKTt2YXIgZz1jW2ZdLGg9Z1swXSxqPWJbaF0uZmlsdGVyKGZ1bmN0aW9uKGspe3JldHVybiBrIT09Zn0pO2NbZl09Zy5jb25jYXQoail9KSx7c3BlY2ljYWxDaGFyYWN0ZXI6T2JqZWN0LmFzc2lnbih7fSxiLGMpLGFsbDpkfX10aGlzLm9ubWVzc2FnZT1mdW5jdGlvbihhKXt2YXIgYj1hLmRhdGEuaW5zdGFuY2VJZCxjPWEuZGF0YS5tZXRhZGF0YSxkPWMuc3BlY2lhbDtpZihkKXt2YXIgZj1kLmNoYXJhY3RlcjtpZighZGF0YVNwZWNpYWxDaGFyYWN0ZXIpbG9hZChkLnVyaSxjLGZ1bmN0aW9uKGssbCl7ZGF0YVNwZWNpYWxDaGFyYWN0ZXI9YW5hbHlzaXNEYXRhKGwud2l0aG91dF9sYW5kKTt2YXIgbT1kLmlzRnVsbD9kYXRhU3BlY2lhbENoYXJhY3Rlci5hbGw6ZGF0YVNwZWNpYWxDaGFyYWN0ZXIuc3BlY2ljYWxDaGFyYWN0ZXJbZl07cG9zdE1lc3NhZ2Uoe2luc3RhbmNlSWQ6YixwYXlsb2FkOntsb29rdXBEYXRhczpbbV0sbWV0YWRhdGE6Y319KX0pO2Vsc2V7dmFyIGc9ZC5pc0Z1bGw/ZGF0YVNwZWNpYWxDaGFyYWN0ZXIuYWxsOmRhdGFTcGVjaWFsQ2hhcmFjdGVyLnNwZWNpY2FsQ2hhcmFjdGVyW2ZdO3Bvc3RNZXNzYWdlKHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6W2ddLG1ldGFkYXRhOmN9fSl9fWVsc2V7dmFyIGg9Yy5sb29rdXBDb25maWcsaj1oLmxvb2t1cFVybCsnLycrYy5wYXJhbXM7bG9hZChqLGEuZGF0YS5tZXRhZGF0YSxmdW5jdGlvbihrLGwpe2lmKCFrKXt2YXIgbTtBcnJheS5pc0FycmF5KGwuanNvbl9zaW5nbGUpJiYoaC5hbGxvd19tdWx0aXBsZSYmQXJyYXkuaXNBcnJheShsLmpzb25fbXVsdGkpP209W2wuanNvbl9zaW5nbGUsbC5qc29uX211bHRpXTptPVtsLmpzb25fc2luZ2xlXSkscG9zdE1lc3NhZ2Uoe2luc3RhbmNlSWQ6YixwYXlsb2FkOntsb29rdXBEYXRhczptLG1ldGFkYXRhOmN9fSl9ZWxzZSBwb3N0TWVzc2FnZSh7aW5zdGFuY2VJZDpiLHBheWxvYWQ6e2Vycm9yOmssbWV0YWRhdGE6Y319KX0pfX07';
// let codeBase64Lookup ='ZnVuY3Rpb24gcmVzcG9uc2VVUkwoYSl7cmV0dXJuJ3Jlc3BvbnNlVVJMJ2luIGE/YS5yZXNwb25zZVVSTDovXlgtUmVxdWVzdC1VUkw6L20udGVzdChhLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKT9hLmdldFJlc3BvbnNlSGVhZGVyKCdYLVJlcXVlc3QtVVJMJyk6dm9pZCAwfWZ1bmN0aW9uIGhlYWRlcnMoYSl7dmFyIGI9bmV3IEhlYWRlcnMsYz1hLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnRyaW0oKS5zcGxpdCgnXG4nKTtyZXR1cm4gYy5mb3JFYWNoKGZ1bmN0aW9uKGQpe3ZhciBmPWQudHJpbSgpLnNwbGl0KCc6JyksZz1mLnNoaWZ0KCkudHJpbSgpLGg9Zi5qb2luKCc6JykudHJpbSgpO2IuYXBwZW5kKGcsaCl9KSxifWZ1bmN0aW9uIGdldFhocigpe2lmKCd1bmRlZmluZWQnIT10eXBlb2YgWE1MSHR0cFJlcXVlc3QpcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtmb3IodmFyIGE9WydNU1hNTDIuWG1sSHR0cC43di4wJywnTVNYTUwyLlhtbEh0dHAuNi4wJywnTVNYTUwyLlhtbEh0dHAuNS4wJywnTVNYTUwyLlhtbEh0dHAuNC4wJywnTVNYTUwyLlhtbEh0dHAuMy4wJywnTVNYTUwyLlhtbEh0dHAuMi4wJywnTWljcm9zb2Z0LlhtbEh0dHAnXSxiPTAsYz1hLmxlbmd0aDtiPGM7YisrKXRyeXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoYVtiXSl9Y2F0Y2goZCl7fX12YXIgeGhyO2Z1bmN0aW9uIGxvYWQoYSxiLGMpe3hocj14aHJ8fGdldFhocigpLDQhPT14aHIucmVhZHlTdGF0ZSYmeGhyLmFib3J0KCk7dmFyIGQ9bmV3IFJlcXVlc3QoYSx7bWV0aG9kOidHRVQnfSk7eGhyLm9ubG9hZD1mdW5jdGlvbigpe3ZhciBmPTEyMjM9PT14aHIuc3RhdHVzPzIwNDp4aHIuc3RhdHVzO2lmKDEwMD5mfHw1OTk8ZilyZXR1cm4gdm9pZCBjKHt4aHI6eGhyLHN0YXR1czpmfSk7dmFyIGc9e3N0YXR1czpmLHN0YXR1c1RleHQ6eGhyLnN0YXR1c1RleHQsaGVhZGVyczpoZWFkZXJzKHhociksdXJsOnJlc3BvbnNlVVJMKHhocil9LGg9J3Jlc3BvbnNlJ2luIHhocj94aHIucmVzcG9uc2U6eGhyLnJlc3BvbnNlVGV4dDtuZXcgUmVzcG9uc2UoaCxnKS5qc29uKCkudGhlbihqPT57YyhudWxsLGopfSkuY2F0Y2goaj0+e2MoaixudWxsKX0pfSx4aHIub25lcnJvcj1mdW5jdGlvbigpe2Moe3hocjp4aHIsc3RhdHVzOnhoci5zdGF0dXN9KX0seGhyLm9wZW4oZC5tZXRob2QsZC51cmwsITApLCdpbmNsdWRlJz09PWQuY3JlZGVudGlhbHMmJih4aHIud2l0aENyZWRlbnRpYWxzPSEwKSwncmVzcG9uc2VUeXBlJ2luIHhociYmJ2Z1bmN0aW9uJz09dHlwZW9mIFJlcXVlc3QucHJvdG90eXBlLmJsb2ImJih4aHIucmVzcG9uc2VUeXBlPSdibG9iJyksZC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oZixnKXt4aHIuc2V0UmVxdWVzdEhlYWRlcihnLGYpfSkseGhyLnNlbmQoJ3VuZGVmaW5lZCc9PXR5cGVvZiBkLl9ib2R5SW5pdD9udWxsOmQuX2JvZHlJbml0KX12YXIgZGF0YVNwZWNpYWxDaGFyYWN0ZXIsYWxsU3BlY2lhbENoYXJhY3Rlcj1bXTtmdW5jdGlvbiBhbmFseXNpc0RhdGEoYSl7dmFyIGI9e30sYz17fTthLmZvckVhY2goZnVuY3Rpb24oZil7Y1tmLnZhbHVlXT1jW2YudmFsdWVdfHxbZi5maWVsZF0sYltmLmZpZWxkXT1iW2YuZmllbGRdfHxbXSxiW2YuZmllbGRdLnB1c2goZi52YWx1ZSl9KTt2YXIgZD1bXTtyZXR1cm4gT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihmKXtkLnB1c2goZik7bGV0IGc9Y1tmXSxoPWdbMF0saj1iW2hdLmZpbHRlcihrPT5rIT09Zik7Y1tmXT1nLmNvbmNhdChqKX0pLHtzcGVjaWNhbENoYXJhY3RlcjpPYmplY3QuYXNzaWduKHt9LGIsYyksYWxsOmR9fXRoaXMub25tZXNzYWdlPWZ1bmN0aW9uKGEpe3ZhciBiPWEuZGF0YS5pbnN0YW5jZUlkLGM9YS5kYXRhLm1ldGFkYXRhLGQ9Yy5zcGVjaWFsO2lmKCFkKXt2YXIgZz1jLmxvb2t1cENvbmZpZyxoPWcubG9va3VwVXJsKycvJytjLnBhcmFtcztsb2FkKGgsYS5kYXRhLm1ldGFkYXRhLGZ1bmN0aW9uKGosayl7aWYoIWope3ZhciBsO0FycmF5LmlzQXJyYXkoay5qc29uX3NpbmdsZSkmJihnLmFsbG93X211bHRpcGxlJiZBcnJheS5pc0FycmF5KGsuanNvbl9tdWx0aSkmJjA8ay5qc29uX211bHRpLmxlbmd0aD9sPVtrLmpzb25fc2luZ2xlLGsuanNvbl9tdWx0aV06bD1bay5qc29uX3NpbmdsZV0pLHBvc3RNZXNzYWdlKHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6bCxtZXRhZGF0YTpjfX0pfWVsc2UgcG9zdE1lc3NhZ2Uoe2luc3RhbmNlSWQ6YixwYXlsb2FkOntlcnJvcjpqLG1ldGFkYXRhOmN9fSl9KX1lbHNlIGlmKCFkYXRhU3BlY2lhbENoYXJhY3Rlcilsb2FkKGQudXJpLGMsZnVuY3Rpb24oaixrKXtkYXRhU3BlY2lhbENoYXJhY3Rlcj1hbmFseXNpc0RhdGEoay53aXRob3V0X2xhbmQpO3ZhciBsPWQuaXNGdWxsP2RhdGFTcGVjaWFsQ2hhcmFjdGVyLmFsbDpkYXRhU3BlY2lhbENoYXJhY3Rlci5zcGVjaWNhbENoYXJhY3RlcltjaGFyYWN0ZXJdO3Bvc3RNZXNzYWdlKHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6W2xdLG1ldGFkYXRhOmN9fSl9KTtlbHNle3ZhciBmPWQuaXNGdWxsP2RhdGFTcGVjaWFsQ2hhcmFjdGVyLmFsbDpkYXRhU3BlY2lhbENoYXJhY3Rlci5zcGVjaWNhbENoYXJhY3RlcltjaGFyYWN0ZXJdO3Bvc3RNZXNzYWdlKHtpbnN0YW5jZUlkOmIscGF5bG9hZDp7bG9va3VwRGF0YXM6W2ZdLG1ldGFkYXRhOmN9fSl9fTs=';
const getWorker = (codeBase64) => {
    let code = new Buffer(codeBase64, 'base64').toString();
    let blob = new Blob([code], { type: "application/javascript" });
    return URL.createObjectURL(blob);
}

export const worker_script = getWorker(codeBase64Lookup);
export default { worker_script };