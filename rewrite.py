import subprocess
import os
from datetime import datetime, timedelta

os.chdir(r'D:\gemetra_real')

res = subprocess.run(['git', 'rev-list', '--reverse', 'main'], check=True, capture_output=True, text=True)
commits = res.stdout.strip().split()

print(f"Rewriting {len(commits)} commits...")

current_date = datetime(2026, 3, 22, 1, 0, 0)
parent_map = {} 
new_head = None

for count, commit in enumerate(commits):
    date_str = current_date.strftime("%Y-%m-%dT%H:%M:%S")
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = date_str
    env["GIT_COMMITTER_DATE"] = date_str

    res_tree = subprocess.run(['git', 'rev-parse', f'{commit}^{{tree}}'], check=True, capture_output=True, text=True)
    tree_hash = res_tree.stdout.strip()
    
    res_parents = subprocess.run(['git', 'log', '-1', '--format=%P', commit], check=True, capture_output=True, text=True)
    old_parents = res_parents.stdout.strip().split()
    
    new_parents = []
    for op in old_parents:
        if op in parent_map:
            new_parents.extend(['-p', parent_map[op]])
            
    res_msg = subprocess.run(['git', 'log', '-1', '--format=%B', commit], check=True, capture_output=True, text=True)
    msg = res_msg.stdout.strip()
    
    cmd = ['git', 'commit-tree', tree_hash] + new_parents + ['-m', msg]
    res_new_commit = subprocess.run(cmd, env=env, check=True, capture_output=True, text=True)
    new_commit_hash = res_new_commit.stdout.strip()
    
    parent_map[commit] = new_commit_hash
    new_head = new_commit_hash
    
    current_date += timedelta(minutes=8) # roughly 200 * 8 = 1600 mins = 26 hours. Fits beautifully into Mar 22 - Mar 23.

subprocess.run(['git', 'branch', '-f', 'rewritten', new_head], check=True)
subprocess.run(['git', 'checkout', 'rewritten'], check=True)
subprocess.run(['git', 'branch', '-D', 'main'], check=True)
subprocess.run(['git', 'branch', '-m', 'main'], check=True)
print("Finished rewriting history!")
