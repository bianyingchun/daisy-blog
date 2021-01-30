import gravatar from 'gravatar';

export default (userInfo) => {
    if (userInfo.gravatar) return
    return gravatar.url(userInfo.email, { protocol: 'https', s: '100' })
}