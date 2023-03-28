describe('路由测试', () => {
  it('测试面包屑', () => {
    cy.visit('/');
    cy.get('a[href*="message"]').click();
    cy.url().should('include', '/message');
    cy.contains('全部评论');
  });
});
