#!/usr/bin/env python3
"""Download all Figma DS icons (URLs valid for 7 days from fetch)."""
import os, urllib.request, re

BASE = r'd:/번외/hom2box.com/kt flowone/src/assets/cp-con/icons'
os.makedirs(BASE, exist_ok=True)

# (name, url) — Figma MCP asset URLs, captured from get_design_context on 2026-05-27
ICONS = [
    # Line icons (4:15518)
    ('line-up',           'https://www.figma.com/api/mcp/asset/fe0c613e-dc36-46d9-9044-0875b023a752'),
    ('line-down',         'https://www.figma.com/api/mcp/asset/6bd9bea0-dd3e-4696-971b-989fb52cedca'),
    ('line-left',         'https://www.figma.com/api/mcp/asset/f0311dbc-0e0d-463a-9f8c-3b99521346c2'),
    ('line-right',        'https://www.figma.com/api/mcp/asset/c0c9e17f-3971-4bd8-8a35-49d8d108f3f5'),
    ('line-double-left',  'https://www.figma.com/api/mcp/asset/fe19b3c4-55ad-485e-8319-3dcbd42b364a'),
    ('line-double-right', 'https://www.figma.com/api/mcp/asset/64b11a20-946f-4954-b744-aa303413cad8'),
    ('line-close',        'https://www.figma.com/api/mcp/asset/4dc2335b-dd09-48f5-bfaf-8a1eab27b189'),
    ('line-plus',         'https://www.figma.com/api/mcp/asset/75dde414-264e-4185-b1cd-be0361ba473b'),
    ('line-minus',        'https://www.figma.com/api/mcp/asset/382c6c4a-0cae-4d4a-a57d-de7f29beabf0'),
    ('line-union',        'https://www.figma.com/api/mcp/asset/4735b78b-fe4c-4de1-8104-9b0ebe331c63'),
    ('line-sorting',      'https://www.figma.com/api/mcp/asset/9c54a830-f10d-47ff-968d-dfbfb8c52673'),
    ('line-calendar',     'https://www.figma.com/api/mcp/asset/59239e7f-d27d-4d97-80d6-ada886191102'),
    ('line-file',         'https://www.figma.com/api/mcp/asset/0f90706b-5654-4acd-876a-4e2147e2e43c'),
    ('line-check',        'https://www.figma.com/api/mcp/asset/32050208-8539-4961-8c12-c1ee7f04b9bd'),
    ('line-search',       'https://www.figma.com/api/mcp/asset/9dbb86a9-ec00-4703-8848-22632144f498'),
    ('line-download',     'https://www.figma.com/api/mcp/asset/083ec0ad-a755-43dc-919a-42ae19629874'),
    ('line-mail',         'https://www.figma.com/api/mcp/asset/5a6693b0-334b-4278-aadc-396464a9d2cb'),
    ('line-edit',         'https://www.figma.com/api/mcp/asset/da29ed50-96b3-4121-af68-e300a4b1891e'),
    ('line-delete',       'https://www.figma.com/api/mcp/asset/cbd1647e-7fb6-4701-8c5f-c5e91dad3f63'),
    ('line-clock',        'https://www.figma.com/api/mcp/asset/96eb7d05-8828-49c3-a250-d51a23c4a4da'),
    ('line-folder',       'https://www.figma.com/api/mcp/asset/1ccb9032-4268-4ad7-83a9-8c286276db0c'),
    ('line-profile',      'https://www.figma.com/api/mcp/asset/c7fc5f94-dee0-4764-9745-aa7f4629ff13'),
    ('line-eye-off',      'https://www.figma.com/api/mcp/asset/49ed20fb-8e14-42a2-a8b0-dc22a9e11686'),
    ('line-eye',          'https://www.figma.com/api/mcp/asset/805acc6c-35c1-47ed-8874-9822c797f5c8'),
    ('line-link',         'https://www.figma.com/api/mcp/asset/cb71bc07-d1a9-4983-920c-10587b5203e2'),
    ('line-question',     'https://www.figma.com/api/mcp/asset/6225c5cb-f1f0-49f8-873a-b94e3e0f66b9'),
    ('line-caution',      'https://www.figma.com/api/mcp/asset/36f3bc73-adb6-47d4-8af3-750f03ffe2c0'),
    ('line-triangle',     'https://www.figma.com/api/mcp/asset/1f40bdaf-7003-4d64-836e-f13da8fb0962'),
    ('line-rotate',       'https://www.figma.com/api/mcp/asset/dd844c15-0c2c-4392-ad98-3bf701be1039'),
    ('line-document',     'https://www.figma.com/api/mcp/asset/8bc41e76-62f8-4dd0-9ed2-2273b591ea28'),
    ('line-film',         'https://www.figma.com/api/mcp/asset/add75518-4869-4211-a76f-68bd33b40238'),

    # Fill icons
    ('fill-close',        'https://www.figma.com/api/mcp/asset/83ba28c3-4a4e-432d-9782-0d47d01e8f17'),
    ('fill-plus',         'https://www.figma.com/api/mcp/asset/af74cb7b-0333-44ce-add0-8ca4060b1d2d'),
    ('fill-minus',        'https://www.figma.com/api/mcp/asset/0c0ed3ad-57dd-4cb8-8eb7-a55c81f3a647'),
    ('fill-caution',      'https://www.figma.com/api/mcp/asset/23fc3dcd-83a7-4d70-8813-fe06b3031e42'),
    ('fill-question',     'https://www.figma.com/api/mcp/asset/14d89403-8d4c-4043-9162-d6a34c2a48ef'),
    ('fill-triangle',     'https://www.figma.com/api/mcp/asset/08e48906-9bd5-4eed-9a5c-a1d0c41b73e6'),
    ('fill-noti',         'https://www.figma.com/api/mcp/asset/fcbc8888-2fcf-421e-a0a0-1fb898fd637f'),
    ('fill-user-1',       'https://www.figma.com/api/mcp/asset/e655a0fa-3294-4be7-8b05-63bed3969c09'),
    ('fill-user-2',       'https://www.figma.com/api/mcp/asset/84bf00a3-0ef3-42a9-bcfc-021590151c29'),

    # Login icons
    ('login-help',        'https://www.figma.com/api/mcp/asset/58ea05f2-93eb-4c05-a272-c31cd40cbce7'),
    ('login-guide',       'https://www.figma.com/api/mcp/asset/ba2df433-a37b-4190-9392-69254802e7ee'),

    # LNB icons (alt, with active state variants)
    ('lnb-home',          'https://www.figma.com/api/mcp/asset/c545b4cd-e864-4b4b-9cfa-b148f4012f59'),
    ('lnb-content-active','https://www.figma.com/api/mcp/asset/7cd12112-a042-422e-b70b-9f6c156b42eb'),
    ('lnb-content',       'https://www.figma.com/api/mcp/asset/140a1c1d-3081-4092-9d02-db320dda0b93'),
    ('lnb-stats-active',  'https://www.figma.com/api/mcp/asset/34897455-db99-41ba-930d-dd980dcab14b'),
    ('lnb-stats',         'https://www.figma.com/api/mcp/asset/b72b7e01-e8aa-4cc3-a452-1041da8254fa'),
    ('lnb-member-active', 'https://www.figma.com/api/mcp/asset/8994e3af-f44e-4b82-868d-1d461b4b630d'),
    ('lnb-member',        'https://www.figma.com/api/mcp/asset/b027453c-9e4b-4703-8d23-38454279b82a'),
    ('lnb-guide-active',  'https://www.figma.com/api/mcp/asset/0989101c-5611-485c-ad4d-08b6a76bfd50'),
    ('lnb-guide',         'https://www.figma.com/api/mcp/asset/70bb85ec-403e-43c0-aceb-e46d8f1ed856'),

    # Logo + warning
    ('logo-kt',           'https://www.figma.com/api/mcp/asset/8a2acae4-83e7-49cb-9b9e-be7e17cbf333'),
    ('logo-flow1',        'https://www.figma.com/api/mcp/asset/27fa0674-8a49-428a-9e14-d45bb43ee02e'),
    ('etc-warning',       'https://www.figma.com/api/mcp/asset/332b4672-56bf-41d2-a176-cf9ad9a39c9f'),

    # Essential marker (red asterisk)
    ('ico-essential',     'https://www.figma.com/api/mcp/asset/b0ddf26a-54fc-431b-a128-7e3d2c5c6319'),
]

# Sanitize attributes that break aspect ratio
SANITIZE = [
    (re.compile(r'\s+preserveAspectRatio="none"'), ''),
    (re.compile(r'\s+width="100%"'), ''),
    (re.compile(r'\s+height="100%"'), ''),
    (re.compile(r'\s+overflow="visible"'), ''),
    (re.compile(r'\s+style="display: block;"'), ''),
]

ok, fail = 0, 0
for name, url in ICONS:
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            data = r.read()
        # Determine extension by magic bytes
        if data.startswith(b'<svg') or data.startswith(b'<?xml'):
            ext = 'svg'
            text = data.decode('utf-8')
            for pat, sub in SANITIZE:
                text = pat.sub(sub, text)
            data = text.encode('utf-8')
        elif data.startswith(b'\x89PNG'):
            ext = 'png'
        elif data.startswith(b'\xff\xd8'):
            ext = 'jpg'
        else:
            ext = 'svg'
        path = os.path.join(BASE, f'{name}.{ext}')
        with open(path, 'wb') as f:
            f.write(data)
        ok += 1
    except Exception as e:
        print(f'FAIL {name}: {e}')
        fail += 1

print(f'\nDownloaded {ok}/{ok+fail} icons to {BASE}')
