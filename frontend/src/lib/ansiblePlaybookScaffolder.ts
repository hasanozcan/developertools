export function generateAnsiblePlaybook(hosts = 'all', name = 'Setup Web Servers'): string {
  return '---' + '\n- name: ' + name + '\n  hosts: ' + hosts + '\n  become: yes\n  tasks:\n    - name: Ensure nginx is installed\n      apt:\n        name: nginx\n        state: present\n        update_cache: yes\n    - name: Start and enable nginx service\n      service:\n        name: nginx\n        state: started\n        enabled: yes\n';
}
