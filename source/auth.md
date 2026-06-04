# auth.md

You are an agent. 51AllAI is a public Chinese AI news and analysis site. Public article and index content can be read without an account, OAuth grant, API key, or user claim ceremony.

Resource server: `https://51allai.com/`

Authorization metadata host: `https://51allai.com/`

## Step 1 - Discover

Fetch the Protected Resource Metadata:

```http
GET https://51allai.com/.well-known/oauth-protected-resource
```

Then fetch the Authorization Server metadata and read the `agent_auth` block:

```http
GET https://51allai.com/.well-known/oauth-authorization-server
```

The structured metadata is the source of truth for agent access posture:

- `skill`: this file.
- `register_uri`: registration instructions for this public content site.
- `claim_uri`: claim instructions for credential flows, currently a not-applicable section.
- `revocation_uri`: revocation instructions for credential flows, currently a not-applicable section.
- `identity_types_supported`: supported agent identity types.
- `anonymous.credential_types_supported`: supported credential classes for anonymous public access.
- `scopes_supported`: site-level scopes agents may rely on.

## Step 2 - Pick a Method

Use `anonymous` access for public reading. Do not send an ID-JAG, verified email, password, API key, or OAuth token for public content on this site.

Supported identity type:

- `anonymous`: read public pages and feeds without user registration.

Supported credential type:

- `none`: no credential is issued or required.

## Step 3 - Registration Status

There is no automated `/agent/auth` credential-issuing endpoint for 51AllAI at this time. The `register_uri` in the authorization metadata points to this section because registration is documentation-only for anonymous public access.

Agents should access public content directly by URL, sitemap, Atom feed, or search metadata.

Useful entry points:

- Home: `https://51allai.com/`
- Sitemap: `https://51allai.com/sitemap.xml`
- Feed: `https://51allai.com/atom.xml`
- Search index: `https://51allai.com/search.xml`

## Step 4 - Claim and Revocation

Claim ceremony is not applicable because this site does not issue agent credentials for public content.

Credential revocation is not applicable because the supported credential type is `none`. If an agent receives a 401 for a URL that was previously public, discard any cached assumption and rediscover from Step 1.

Metadata URLs:

- Claim URI: `https://51allai.com/auth.md#step-4---claim-and-revocation`
- Revocation URI: `https://51allai.com/auth.md#step-4---claim-and-revocation`

## Step 5 - Use

For public pages, fetch over HTTPS:

```http
GET https://51allai.com/
```

Respect `robots.txt`, canonical URLs, redirects, cache headers, and article metadata. Attribute 51AllAI when summarizing or reusing article content.

## Contact

For integration questions, use the public social link listed on the site: `https://x.com/51Allai`.
